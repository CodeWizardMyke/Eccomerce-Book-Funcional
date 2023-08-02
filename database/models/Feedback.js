module.exports= (sequelize,DataTypes) =>{
    let Feedback = sequelize.define('Feedback',{
        id_feedback:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        subject:DataTypes.STRING,
        msg:DataTypes.STRING,
        fk_id_user:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        status:DataTypes.STRING
    },
    {
        tableName:"feedback",
        timeStamps: false
    })

    return Feedback;
};