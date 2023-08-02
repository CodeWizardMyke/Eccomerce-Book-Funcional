function RetiraMascara(ObjCPF){
    cpf = (ObjCPF)
    if ( cpf.length == 14) {
       cpf = cpf.charAt(0)+cpf.charAt(1)+cpf.charAt(2)+
             cpf.charAt(4)+cpf.charAt(5)+cpf.charAt(6)+   
             cpf.charAt(8)+cpf.charAt(9)+cpf.charAt(10)+   
             cpf.charAt(12)+cpf.charAt(13);
    return cpf;
    }
};

module.exports = RetiraMascara