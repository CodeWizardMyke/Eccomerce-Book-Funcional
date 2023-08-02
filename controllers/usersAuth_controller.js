const {Users, Token_invalid} = require('../database/models');

// ------------- import functions --------------- //
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
require('dotenv').config();

const AuthController = {
    view_signUp:(req,res) => {
        return res.render('user_sing_up');
    },
    signUp: async (req, res) => {
        try {
            delete req.body.re_email;
            delete req.body.re_password;
            
            req.file ? req.body.user_avatar = req.file.filename : req.body.user_avatar = "default.png" ;
            req.body.password = bcrypt.hashSync(req.body.password, 10);
            
            const createdNewUser = await Users.create(req.body);

            const token = jwt.sign({id:createdNewUser.id_user},process.env.JWT_KEY, {expiresIn:'8h'});

            return res.status(201).json({user:createdNewUser, token})
        } catch (error) {
            return res.status(400).json(error);
        };
    },
    view_login:(req,res) => {
        res.render('user_login')
    },
    login: async (req, res) => {
        try {
            const user = req.body.user;

            user.password = null;
            const token = jwt.sign({ id:user.id_user }, process.env.JWT_KEY, {expiresIn:'8h'});;

            return res.status(202).json({user, token});
        } catch (error) {
            return res.status(400).json(error);
        };
    },
    logout: async (req, res) => {
        try {
            let token = { code: req.token };

            await Token_invalid.create(token);
            return res.status(202).json('sucess logout').end();
        } catch (error) {
            res.status(417).json(error);
        };
    },
};

module.exports = AuthController;