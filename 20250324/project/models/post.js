const { DataTypes, Model } = require("sequelize");

class Post extends Model { // 
    static init(sequelize) {
        return super.init({
            content : {
                type : DataTypes.STRING(100),
                allowNull : false
            }
        },{
            sequelize : sequelize,
            timestamps : false, 
            underscored : false, 
            modelName : 'Post', 
            tableName : 'posts', 
            paranoid : false, 
            charset : "utf8mb4", 
            collate : "utf8mb4_general_ci" 
        })
    }
    static associate(models){
        models.Users.hasMany(models.Posts, {foreignkey : "user_name", sorceKey : "name", onDelete : "CASECADE"})
    }
}

module.exports = Post;