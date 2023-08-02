module.exports = (sequelize, DataTypes) =>{
    let BestSaler = sequelize.define('BestSaler',{
        id_bestsaler:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull:false
        },
        purchasing_score:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        visited_score:{   
            type:DataTypes.INTEGER,
            allowNull:true
        },
        fk_id_books:DataTypes.INTEGER,
    },
    {
        tableName:'bestsaler',
        timestamps: false
    })
    
    BestSaler.associate = (models) => {
        BestSaler.belongsTo(models.Books, {foreignKey: 'fk_id_books', as: 'books'});
    };
 
    return BestSaler;
}