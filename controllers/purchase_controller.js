const {BestSaler} = require('../database/models')

const purchases_views_controllers = {
    get_cart_view: async (req,res) =>{
        
        let products  = await BestSaler.findAndCountAll({
            include:'books',
            order:[['purchasing_score','DESC']],
            limit:10,
        });
        const {rows} = products

        return res.render('user_cart',{emphasis:rows});
    },
    get_paymen_view: async (req, res) =>{
        return res.render('user_payment')
    }
};

module.exports = purchases_views_controllers;