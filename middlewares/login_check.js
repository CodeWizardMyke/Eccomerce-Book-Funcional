const {Users} =require('../database/models');

const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');

const login_check = async (req, res, next) => {
    const result = validationResult(req);
    if(result.errors.length > 0){
        return res.status(422).json(result);
    };

    const {email, password} = req.body;
    
    let user = await Users.findOne({where:{email:email}});
    if(user == null){
        const error = [{
            value: '',
            msg: 'Endereço de E-mail ou senha incorreta',
            param: 'email',
            location: 'body'
          }];

        return res.status(409).json(error);
    };
    
    let pass = bcrypt.compareSync(password, user.password);
    if(!pass){
        const error = [{
            value: '',
            msg: 'Endereço de E-mail ou senha incorreta',
            param: 'email',
            location: 'body'
          }];
        return res.status(409).json(error);
    }
    req.body.user = user;

    return next();
};

module.exports = login_check;