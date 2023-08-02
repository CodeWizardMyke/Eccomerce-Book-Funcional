const {Payment, Users, User_information, Cart} = require('../database/models');
const limit_offset = require('../functions/limit_offset');
const {Op} = require('sequelize');

const api_purchases ={
    get: async (req, res)=>{
        try {
            const {id} = req.id_user;
            let purchases = await Payment.findAll({where:{ fk_id_user : id }});
            return res.status(200).json(purchases)
            
        } catch (error) {
            return res.status(401).json(error);
        };
    },
    get_sales: async (req, res) => {
        try {
            let sales = await Payment.sequelize.query(`SELECT MONTH(createdAt) AS mes, SUM(price) AS total_vendas
            FROM payment
            GROUP BY mes 
            ORDER BY mes ASC
            `);

            return res.json({sales:sales[1]});
            
        } catch (error) {
            return res.status(401).json(error);
        };
    },
    search_sales: async (req, res) =>{
        try {
            const {search} = req.headers;

            if(Number(search)){
                let payment = await Payment.findOne({where:{api_payment_id:search}});
                return res.json(payment);
            }
    
            let {limit, offset} = limit_offset(req.headers.paginate);
    
            let payment = await Payment.findAndCountAll({
                limit,
                offset: limit * (offset -1),

            });
            return res.json({payment, nPages: Math.ceil(payment.count / limit)});
        } catch (error) {
            return res.status(401).json(error);
        };
    },
    get_all_info: async (req, res) =>{ 
       try {
            let {id} = req.headers;
            let payment = await Payment.findByPk(Number(id));
            
            let {fk_id_user} = payment;
            let user = await Users.findByPk(fk_id_user);
            user.password = null;
            let info = await User_information.findOne({where:{fk_id_user:fk_id_user}});
            let cart = await Cart.findOne({where:{id_cart:payment.fk_id_cart},include:'books'})

            return res.json({payment, user, info, cart});
       } catch (error) {
            return res.status(401).json(error);
       }
    }
}

module.exports = api_purchases;