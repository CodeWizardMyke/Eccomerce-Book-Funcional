const {Books, Cart, BestSaler} = require ('../database/models');
const {Op} = require('sequelize');

//function is use for handdler data limit offset
const limit_offset = require('../functions/limit_offset');
const { validationResult } = require('express-validator');
const emptyValuesRemove = require('../functions/emptyValuesRemove');
const remove_img_book = require('../functions/remove_img_book');

const products = {
    post_prod : async (req, res) =>{
        try {
            let result = validationResult(req);
            if( result.errors.length > 0 ){
                if(req.file){
                    remove_img_book(req.file.filename);
                };
                return res.status(401).json(result)
            };
    
            if(req.file){
                req.body.front_cover = req.file.filename;
                req.body.status = 'active';
                const created = await Books.create(req.body);
                return res.status(201).json(created);
            };

        } catch (error) {
            console.log(error)
            return res.status(404).json(error)
        };
    },
    get_prod : async (req, res) =>{
        try {
            let {id} = req.params ;

            let product = await Books.findByPk(id);
            
            return res.status(200).json(product);
        } catch (error) {
            return res.status(401).json(error);
        };
    },
    put_prod : async (req, res) =>{
        const {id} = req.params;
        
        let {errors} = validationResult(req);
        if(errors.length > 0){remove_img_book(req.file.filename);return res.status(401).json(errors); }
        
        if(req.file){body.push({front_cover:req.file.filename});}

        let body = emptyValuesRemove(req.body)

        let product = await Books.findByPk(id);
        product.update(body);

        return res.json(product);
    },
    delete_prod : async (req, res) =>{
        try {
            const {id} = req.params;
            let product = await Books.findByPk(id);
            let {status} = product;
            
            if(status == 'active'){
                product.status = 'disabled';
                await product.update();
                await product.save();
            }else{
                product.status = 'active';
                await product.update();
                await product.save();
            };
            return res.status(202).json(product);
        } catch (error) {
            return res.status(401).json(error);
        };
    },
    get_all_prod: async (req, res) =>{
        try {
            let {limit, offset} = limit_offset(req.headers.paginate);
            let {genre} = (req.headers);
            let products;
            
            if(genre){
                products = await Books.findAndCountAll({
                    where:{
                        status:'active',
                        genre:JSON.parse(req.headers.genre)
                    },
                    limit,
                    offset: limit * ( offset -1)
                });
            }else{
                products = await Books.findAndCountAll({
                    where:{status: 'active'},
                    limit,
                    offset: limit * ( offset -1)
                });
            };
            
            return res.status(201).json({
                content:products.rows,
                nPages: Math.ceil(products.count / limit)
            });
        } catch (error) {
            return res.status(401).json(error);
        };
    },
    get_prod_carousel: async (req, res) =>{
        try {
            let carousel_items = await Books.findAndCountAll({limit:5,where:{status:'active',genre:'finance'}});
            return res.status(200).json({content:carousel_items.rows});
        } catch (error) {
            return res.status(401).json(error);
        };
    },
    prod_search: async (req, res)=>{
        try {
            const {search} = req.headers;

            if(search){
                let {limit, offset} = limit_offset(req.headers.paginate);

                const products_search = await Books.findAndCountAll({
                    where:{
                        status:'active',
                        title:{
                            [Op.like] : `%${JSON.parse(search)}%`
                        }
                    },
                    limit,
                    offset: (limit * (offset -1))
                    });

                if(req.admin == 'true'){
                    let {limit, offset} = limit_offset(req.headers.paginate);

                    const products_search = await Books.findAndCountAll({
                        where:{
                            title:{
                                [Op.like] : `%${JSON.parse(search)}%`
                            }
                        },
                        limit,
                        offset: (limit * (offset -1))
                        });
                    
                    return res.status(200).json({
                    products:products_search,
                    nPages: Math.ceil(products_search.count / limit),})
                }
                
                return res.status(200).json({
                products:products_search,
                nPages: Math.ceil(products_search.count / limit),})
            };
            
        } catch (error) {
            return res.status(401).json(error);
        };
    },
};
module.exports = products;