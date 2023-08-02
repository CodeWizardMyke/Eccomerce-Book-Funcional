module.exports = (sequelize, DataTypes) =>{

    Payment = sequelize.define('Payment',{
        id_payment:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        api_payment_id:DataTypes.INTEGER,
        api_mechant_order:DataTypes.STRING,
        api_payment_type: DataTypes.STRING,
        fk_id_user:DataTypes.INTEGER,
        fk_id_cart:DataTypes.STRING,
        status:DataTypes.STRING,
        price: DataTypes.INTEGER,
    },
    {
        tableName:'payment',
    });
    
    Payment.associate = ( models => {
        Payment.belongsTo(models.Users, {foreignKey: 'fk_id_user', as : 'user' });
    })

    return Payment;
}