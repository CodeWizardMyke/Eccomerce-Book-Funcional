const {Feedback, User} = require('../database/models');

//functions required
const limit_offset = require('../functions/limit_offset');

const apiFeedback = {
    get : async (req,res) => {
        try {
            let {limit, offset} = limit_offset(req.headers.paginate);

            let feedback = await Feedback.findAndCountAll({
                where:{status:"pendding"},
                limit,
                offset: limit * ( offset - 1),
            });

            return res.json({feedback, nPages: Math.ceil( feedback.count / limit )});
        } catch (error) {
            return res.json(error);
        };
    },
    get_id : async (req, res )=>{
        try {
            const {id} = req.params;
            
            let  feedaback = await Feedback.findByPk(id);

            return res.json(feedaback);
        } catch (error) {
            return res.json(error);
        };
    },
    put : async (req, res )=>{
        try {
            const {status} = req.body;
            const {id} = req.params;
    
            let feedback = await Feedback.findByPk(id);
            feedback.status = status;
            await feedback.save();

            if(!status){
                return res.status(401).json({error:'status não definido'});
            };

            return res.json(feedback);
        } catch (error) {
            return res.json(error);
        };
    },
};

module.exports = apiFeedback;