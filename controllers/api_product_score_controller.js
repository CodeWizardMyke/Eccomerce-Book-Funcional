const {BestSaler} = require('../database/models');

//functions
const limit_offset = require('../functions/limit_offset');

const product_score = {
    get_bestsaler: async (req, res )=>{
        try {
            let {limit, offset} = limit_offset(req.headers.paginate);

            let products = await BestSaler.findAndCountAll({
                include:'books',
                order:[['purchasing_score','DESC']],
                limit,
                offset: limit * ( offset -1)
            });

            return res.send({
                content:products.rows,
                nPages: Math.ceil(products.count / limit)
            });
        } catch (error) {

            return res.status(401).json(error);
        };
    },
    get_indication: async (req, res )=>{
        try {
            let {limit, offset} = limit_offset(req.headers.paginate);

            let products = await BestSaler.findAndCountAll({
                include:'books',
                order:[['visited_score','DESC']],
                limit,
                offset: limit * ( offset -1)
            });

            return res.send({
                content:products.rows,
                nPages: Math.ceil(products.count / limit)
            });
        } catch (error) {

            return res.status(401).json(error);
        };
    },
};

module.exports = product_score;