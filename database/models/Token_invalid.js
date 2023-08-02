const Token_invalid = (sequelize, DataTypes) =>{
    const Token_invalid = sequelize.define('Token_invalid',{
        id_token_invalid:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        code:DataTypes.STRING
    },
    {
        tableName:'token_invalid'
    });
    return Token_invalid;
}

module.exports = Token_invalid;