const {Users} = require('../database/models');

// importation functions required //
const {validationResult} = require('express-validator')
const path = require('path');
const fs = require('fs');

const checking = async (req, res, next) =>{
    const result = validationResult(req);
    if(result.errors.length >0){ 
        if(req.file){
            const filename = req.file.filename
            const storage = path.resolve(__dirname,`../public/images/users/${filename}`)
            fs.unlink(storage, err => { err ? console.log(err) : "" })
        }
        return res.status(422).json(result) 
    };

    const {email} = req.body;
    const UserExists = await Users.findOne({where:{email:email}});
    if(UserExists){
        const errors = [{ param:"email", msg:"Endereço de email já cadastrado no sistema!", location: "body" }];
        return res.status(409).json({errors});
    };
    return next();
};

module.exports = checking;