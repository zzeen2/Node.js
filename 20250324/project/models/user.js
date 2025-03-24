const { DataTypes, Model } = require("sequelize");

class User extends Model { // 
    static init(sequelize) {
        return super.init({
            name :{
                type : DataTypes.STRING(20), 
                primaryKey : true, 
            },
            nick : {
                type : DataTypes.STRING(20), 
                unique : true, 
            },
            createAt : {
                type : DataTypes.DATE,
            }
        },{
            sequelize : sequelize,
            timestamps : false, 
            underscored : false, 
            modelName : 'User', 
            tableName : 'users', 
            paranoid : false, 
            charset : "utf8mb4", 
            collate : "utf8mb4_general_ci" 
        })
    }
    static associate(models){
        models.Users.hasMany(models.Posts, {foreignkey : "user_name", sorceKey : "name"})
    }
}

module.exports = User;