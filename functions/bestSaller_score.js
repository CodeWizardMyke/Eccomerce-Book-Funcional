const {BestSaler} = require('../database/models');

module.exports = async ( id, qtd ) =>{
    let bestSeller = await BestSaler.findOne({where:{fk_id_books:id}});
    
    item = {
        purchasing_score: qtd,
        fk_id_books:id
    };
    
    if(!bestSeller){
        await BestSaler.create(item);
    };

    if(bestSeller){
        bestSeller.purchasing_score =  bestSeller.purchasing_score + qtd
        await bestSeller.save();
    };

    return bestSeller;
};