const {Token_invalid} = require('../database/models');

const jwt = require('jsonwebtoken');
require('dotenv').config()

const verifyJWT = async (req, res, next) => {
    const {authorization}  = req.headers;
    const {u_token} = req.body

    let token = undefined;
    if(authorization){ token = authorization.split(' ')[1]; }
    if(u_token){ token = u_token; }
    
    let token_black_list =  await Token_invalid.findOne({where:{code:token}});
    if(token_black_list){return res.status(401).json('faça login novamente').end();};

    jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
        if(error){
            return res.status(401).json(`token inválido ${error}`);
        };
        req.id_user = decoded;
        req.token = token;
        return next();
    });
};

module.exports = verifyJWT;