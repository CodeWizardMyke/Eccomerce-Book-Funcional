const {Cart, User_information} = require('../database/models')

//functions required
const price_book = require('../functions/price_book');//return arr first position price un, secont possition price * qtd

module.exports = {
    post_cart: async (req, res) =>{
        try {
            const {id_books, qtd_items, type_selected} = JSON.parse(req.headers.body);
            const {id} = req.id_user;
            
            let arrPrice = await price_book(id_books, type_selected, qtd_items); 

            const newItemCart = {
                item_price:arrPrice[0],
                request_price:arrPrice[1],
                status:"pending",
                qtd_items,
                type_selected,
                fk_id_books:id_books,
            };

            if(id){
                newItemCart.fk_id_user = id;
                let addInCart = await Cart.create(newItemCart);

                return res.status(201).json(addInCart);
            };
        } catch (error) {
            return res.status(404).json(error);
        };
    },
    get_cart: async (req, res) =>{
        try {
            const {id} = req.id_user;
            const cart_pendding = await Cart.findAll({where:{fk_id_user: id, status:'pending' },include:'books'});

            return res.status(200).json(cart_pendding);
        } catch (error) {
            return res.status(401).json({error});
        };
    },
    put_cart: async (req,res) =>{
        let {id} = req.params;
        let {qtd} = req.body;

        if(id && qtd > 0){
            let item = await Cart.findOne({where:{id_cart : id, status:"pending" }});
            
            let {type_selected, fk_id_books,} = item;
            let arrPrice = await price_book(fk_id_books, type_selected, qtd); 

            item.qtd_items = qtd;
            
            item.request_price = arrPrice[1];
            item.save();
        };

        return res.redirect('/purchase/cart');
    },
    delete_cart: async (req, res) =>{
        const {id} = req.params;

        if(id){
            await Cart.destroy({where:{id_cart : id, status:"pending"}})
        };

        return res.redirect('/purchase/cart');
    },
    clean_cart: async (req, res) =>{
        try {
            const {id} = req.id_user;

            if(id){
                let item = await Cart.destroy({where:{fk_id_user : id, status:"pending"}});
                return res.status(200).json(item);
            };
        } catch (error) {
            return res.status(401).json(error);
        };
    }
};