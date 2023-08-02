const {User_information} = require ('../database/models');

//functions required
const {validationResult, check} = require('express-validator');
const info_fields =  require('../functions/api_user_info_fields');// impedir que tenhamos dados duplicados
const emptyValuesRemove = require('../functions/emptyValuesRemove');

const information = {
    post_info: async (req, res) =>{
        try {
            req.body.fk_id_user  = req.id_user.id;
            const check  = validationResult(req)
            if(check.errors.length > 0 ){ return res.status(401).json({errors: check.errors}) };

            let cpf_exists = await User_information.findAll({where:{user_cpf:req.body.user_cpf}})
            if(cpf_exists.length > 0){ return res.status(409).json({error:"Usuario já cadastrado com este cpf"}) };

            let created = await User_information.create(req.body);
            return res.status(201).json(created);
            
        } catch (error) {
            return res.status(401).json(check)
        };
    },
    get_info: async (req, res) =>{
        try {
            const {id} = req.id_user;
            
            const information = await User_information.findOne({where:{fk_id_user:id}});
            
            return res.json(information);
        } catch (error) {
            return res.json(error);
        };
    },
    put_info: async (req, res) =>{
        try {
            const {id} = req.headers;
            let result = emptyValuesRemove(req.body);

            for(let i in result){
                if(i){
                   let info = await putMyInformation();
                   if(info){ return res.status(200).json(info) };
                };
            };
            async function putMyInformation(){
                let info = await User_information.findOne({where:{fk_id_user: id }});
                await info.update(result);
                await info.save();
                return info;
            };

            return res.status(304).json({msg:'nenhum valor foi alterado'});
        } catch (error) {
            return res.status(401).json(error);
        };
    },
    delete_info: async (req, res) =>{
        try {
            const {id} = req.headers;

            await User_information.destroy({where:{fk_id_user:id}});

            return res.status(200).json({msg:'informações removidas com sucesso!'})
        } catch (error) {
            return res.status(401).json(error)
        }
    },
};
 
module.exports = information;