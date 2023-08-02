const {Users, User_information, Cart} = require('../database/models');
const {Op} = require('sequelize');

const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');

//functions required
const limit_offset = require('../functions/limit_offset');
const emptyValuesRemove = require('../functions/emptyValuesRemove');
const remove_avatar = require('../functions/remove_avatar');

const profile_controller = {
    post_user: async (req, res) =>{
        try {
            const body = req.body;
            
            let result = validationResult(req);
            if(result.errors.length > 0){
                return res.status(406).json(result);
            };
            
            let isEmailExists = await Users.findOne({where:{'email':body.email}});
            if(isEmailExists){
                const error = {email:"Este email já esta cadastrado no sistema"};
                return res.status(409).json(error);
            };
            let pass = bcrypt.hashSync(body.password, 10);
            body.password = pass
            
            body.user_avatar = 'default.png';
            body.status = 'active';

            let created = await Users.create(body);

            return res.status(201).json(created);
        } catch (error) {
            return res.status(401).json(error);
        };
    },
    get_user: async (req, res) => {
        const body = JSON.parse(req.headers.body);
        const search = JSON.parse(req.headers.search);
        let {limit, offset} = limit_offset(req.headers.paginate);

        switch (body.type) {
            case 'user_name':
                let usersName = await getUserstByName();
                return res.json({users:usersName, nPages: Math.ceil(usersName.count / limit),});

            case 'user_email':
                console.log('email')
                let usersEmail = await getUserstByEmail();
                return res.json({users:usersEmail, nPages: Math.ceil(usersEmail.count / limit),});

            default:
                let emptySearch = await Users.findAndCountAll();
                emptySearch.rows.forEach( element => {
                    element.password = null;
                });
                return res.json({users:emptySearch, nPages: Math.ceil(emptySearch.count / limit),});
        }

        async function getUserstByName(){
            let users = await Users.findAndCountAll({
                where:{username:{ [Op.like]:`%${search}%` }},
                limit,
                offset: (limit * (offset -1))
            });
            users.rows.forEach( element => {
                element.password = null;
            });
            return users;
        };
        async function getUserstByEmail(){
            let users = await Users.findAndCountAll({
                where:{email:{ [Op.like]:`%${search}%` }},
                limit,
                offset: (limit * (offset -1))
            });
            users.rows.forEach( element => {
                element.password = null;
            });
            return users;
        };

    },
    userGetById: async (req, res) => {
        try {
            const {id} = req.params
            let user = await Users.findByPk(id);
            let info = await User_information.findOne({where:{fk_id_user:id}})
            user.password = null
            return res.json({user, info})
        } catch (error) {
          return res.status(401).json(error)
        };
    },
    put_user: async (req, res) =>{
        try {
            let result = validationResult(req)
            let body = emptyValuesRemove(req.body);
            let {id} = req.params

            console.log('here')

            if(result.errors.length > 0){
                remove_avatar(req.file.filename);
                return res.status(401).json(result);
            }
            
            if(body.email){
                let emailIsExists = await Users.findAll({where:{email:body.email}});
                if(emailIsExists.length > 0){
                    return res.status(401).json({error:{email:'Email já registrado no sistema'}})
                }
            }
            
            let user = await Users.findByPk(id);
            if(req.file){
                if(user.user_avatar !== 'default.png'){
                    remove_avatar(user.user_avatar);
                }
                body.user_avatar = req.file.filename;
            }
            if(body.password){
                body.password= bcrypt.hashSync(body.password, 10)
            }

            user.update(body);
            return res.json(user)
           
        } catch (error) {
            return res.status(401).json(error);
        };
    },
    delete_user: async (req, res) =>{
        try {
            let {id} = req.params;

            let deleted_info = await User_information.findOne({where:{fk_id_user:id}})
            let deleted_cart = await Cart.findOne({where:{fk_id_user:id}})
            let getUser = await Users.findByPk(id)

            if(deleted_info !== null){
                User_information.destroy({where:{fk_id_user:id}})
            }
            if(deleted_cart !== null){
                Cart.destroy({where:{fk_id_user:id}})
            }
            if(getUser.user_avatar !== 'default.png'){
                remove_avatar(getUser.user_avatar)
            }
            let user = await Users.destroy({where:{id_user:id}})
    
            return res.json(deleted_user);
        } catch (error) {
            return res.status(401).json(error);
        }
    },
    fomr_put: async (req,res) =>{
        const {errors} = validationResult(req);
        const {username, email, password} = req.body;
        let {id} = req.id_user;

        console.log(req.file)
        
        let body ={username,email};

        
        if(password.length >5){
            body.password = bcrypt.hashSync(password,10)
        };

        if(req.file){
            body.user_avatar = req.file.filename
        }

        if(errors.length >0 ){
            errors.forEach(element => {
                if(element.param == 'username'){
                    delete body.username
                }
                if(element.param == 'email'){
                    delete body.email;
                }
                if(element.param == 're_email'){
                    delete body.email;
                }
                if(element.param == 'password'){
                    delete body.password;
                }
                if(element.param == 're_password'){
                    delete body.password;
                }
            });
        }
        
        let user =  await Users.findByPk(id);
        user.update(body);
        await user.save();

        res.redirect('/user/profile/');
    },
    auth: async(req,res) => {
        try {
            const {id} = req.id_user;
            if(id){
                let user = await Users.findByPk(id)
                if(user.admin === 'true'){
                    user.password = null
                    return res.json(user);
                }
                return res.status(401).json(false)
            }
        } catch (error) {
            return res.json(error);
        };
    },
};

module.exports = profile_controller;