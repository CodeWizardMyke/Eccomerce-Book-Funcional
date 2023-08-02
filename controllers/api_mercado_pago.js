require('dotenv').config();
const mercadopago = require("mercadopago");
const payment_approved = require("../functions/api_mercado_pago/payment_approved");

mercadopago.configure({ access_token: process.env.MERCADOPAGOTOKEN });

const urlBase ={
    sucess : 'http://localhost:3000/api/mp/get',
    faill: 'http://localhost:3000/'
};

const api_mercado_pago = {
    post_preference: async (req, res) => {
        const {id} = req.id_user

        req.session.id_user = id

        let preference = {
            items:req.body,
            back_urls: {
                "success": urlBase.sucess,
                "failure": urlBase.faill,
                "pending": urlBase.faill
            },
            auto_return: "approved"
        };
        
       let response = await mercadopago.preferences.create(preference)

       return res.status(200).json({id:response.body.id})
    },
    get_preference: async (req, res) =>{
        const id = req.session.id_user;

        if(!id){
            return res.redirect('/');
        };

        if(req.query.status == 'approved'){
            await payment_approved(req, id);
            res.redirect('/user/profile');
        }
    },
};

module.exports = api_mercado_pago;
