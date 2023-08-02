const {BestSaler} = require('../database/models')

module.exports = async (req,res,next) =>{
    const  id  = req.params.id
    let bestSeller = await BestSaler.findOne({where:{fk_id_books:id}})
    item = {
        purchasing_score: 0,
        visited_score: 1,
        fk_id_books: id
    };
    
    if(!bestSeller){
        await BestSaler.create(item)
    }

    if(bestSeller){
        bestSeller.visited_score =  bestSeller.visited_score + 1
        await bestSeller.save()
    }

    return next()
}