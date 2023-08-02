
const fields = (body) =>{
    let object = {};

    object.cep  = body.cep;
    object.road  = body.road;
    object.district  = body.district;
    object.city  = body.city;
    object.state  = body.state;
    object.complements  = body.complements;
    object.number = body.number;
    object.email = body.email;

    if(body.full_name[1]){
        object.full_name  = body.full_name[0];
    }else{
        object.full_name  = body.full_name;
    };

    if(body.birth_date[1]){
        object.birth_date  = body.birth_date[0];
    }else{
        object.birth_date  = body.birth_date;
    };

    if(body.telephone[1]){
        object.telephone  = body.telephone[0];
    }else{
        object.telephone  = body.telephone;
    };
    
    if(body.user_cpf[1]){
        object.user_cpf  = body.user_cpf[0];
    }else{
        object.user_cpf  = body.user_cpf;
    };

    if(body.telephone[1]){
        object.user_rg  = body.user_rg[0];
    }else{
        object.user_rg  = body.user_rg;
    };

    return object;
};

module.exports = fields