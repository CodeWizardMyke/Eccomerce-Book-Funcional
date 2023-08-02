const {Books, Feedback} = require ('../database/models');
const {Op} = require('sequelize')

/* function required */
const feedback_handdler = require('../functions/feedback_handdler');

module.exports = { 
    index : async (req,res) => { 
        res.render('index');
    },
    library :async (req,res) => {
        res.render('library');
    },
    produto: async (req,res) => {
        const admin = req.session.admin
        const emphasis = await Books.findAll({ where: {genre: 'fiction'}})

        let id_book = req.params.id
        
        if(id_book){
            const book = await Books.findByPk(id_book)
                
            res.render('produto', {
                book,
                emphasis,
                admin
            })

        }else{
            const error = {error:{msg:"não encontramos nada com este id !"}}
            res.render('error', {errors:error})
        }
    },
    search : async (req,res) => {
        return res.render('prod_search');
    },
    indication: async (req, res) =>{
        res.render('prod_score');
    },
    bestsaler: async (req, res) =>{
        res.render('prod_bestsaler');
    },
    feedback : (req, res) =>{
        res.render('feedback')
    },
    feedback_post : async (req, res) =>{
        try {
            const {subject, msg} = req.body;
            const {id_user} = req.headers;

            const result_check = feedback_handdler(subject, msg, id_user);
            if(result_check.error){
                return res.render('feedback',{error:result_check.error})
            }else{
                let create_feedback = await Feedback.create(result_check);
                
                return res.render('feedback',{created:create_feedback});
            };
        } catch (error) {
            return res.send(error);
        };
    },
};