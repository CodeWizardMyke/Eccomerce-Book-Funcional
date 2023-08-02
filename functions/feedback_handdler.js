const feedback_handdler = (fieldOne, filedSec, id_user)=>{
    /*handdler fields is not empti*/
    if(!fieldOne){
        const error = {error:{msg:"Error. preencha todos os campos para enviar o ticket"}};
        return error;
    };
    if(!filedSec){
        const error = {error:{msg:"Error. preencha todos os campos para enviar o ticket"}};
        return error;
    };

    /* create object whith data */
    let createFeedback = {
        subject:fieldOne,
        msg:filedSec,
        status:'pendding'
    };

    /* handdler user exists */
    if(id_user != undefined){
        createFeedback.fk_id_user = id_user;
    };
    
    return createFeedback;
};

module.exports = feedback_handdler;