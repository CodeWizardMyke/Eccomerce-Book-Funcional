const {Books} = require('../database/models');

module.exports = async (id_book, type, qtd) => {
    const book = await Books.findByPk(id_book);
    let price = 0;

    switch (type) {
        case 'kindle':
            price = Number(book.kindle_price);
            break;
        case 'common':
            price = Number(book.common_price);
            break;
        case 'special':
            price = Number(book.special_price);
            break;
        case 'all-types':
            price = Number(book.kindle_price + book.common_price + book.special_price);
            break;
        default:
            break;
    };
    
    if(price > 0){
        console.log(price)
        return [Number(price), Number(price*qtd)];
    };
};