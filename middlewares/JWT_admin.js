const {Token_invalid, Users} = require('../database/models');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const verifyJWT = async (req, res, next) => {
    const {authorization}  = req.headers;

    if(authorization){ 
        let  token = authorization.split(' ')[1]; 
        let token_black_list =  await Token_invalid.findOne({where:{code:token}});
        if(token_black_list){return res.status(401).json('faça login novamente').end();};
   
       jwt.verify(token, process.env.JWT_KEY, async (error, decoded) => {
            if(error){
                return res.status(401).json(`token inválido ${error}`);
            };
            const {id} = decoded;
            const user = await Users.findOne({where:{id_user:id}})
            req.admin = user.admin
       });
    };
    return next();
};

module.exports = verifyJWT;