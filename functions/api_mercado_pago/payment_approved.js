const { Books, Cart, Payment} = require('../../database/models');

async function  payment_approved (req, id_user){
    let cart_user = await Cart.findAll({where:{fk_id_user:id_user, status:'pending'}});
    
    cart_user.forEach(element => {
        decrease_inventory(element.fk_id_books, element.qtd_items);
        change_status(element.id_cart);
        add_payment_table(element);
    });

    async function decrease_inventory (id, qtd){
        let book  = await Books.findOne({where:{id_books: id }});
        book.inventory -= qtd;
        book.save();
    };

    async function change_status (id){
        let item_cart = await Cart.findOne({where:{ id_cart : id }});
        item_cart.status = 'approved';
        item_cart.save();
    };

    async function add_payment_table (element){
        let payment ={
            api_payment_id: req.query.payment_id,
            api_mechant_order: req.query.merchant_order_id,
            api_payment_type: req.query.payment_type,
            fk_id_user: id_user,
            fk_id_cart:element.id_cart,
            status: req.query.status,
            price: element.request_price,
        }
        await Payment.create(payment);
    };
};

module.exports = payment_approved;