const{DataTypes,Model}=require("sequelize");

class Post extends Model {
    static init(sequelize){
        return super.init({
            title : {
                type : DataTypes.STRING(20),
                allowNull : false
            },
            content : {
                type : DataTypes.STRING,
                allowNull : false
            },
            user : {
                type : DataTypes.STRING(10),
                allowNull : false
            }
        }, {
            sequelize,
            timestamps : true,
            modelName : "Post",
            tableName : "posts",
            charset : "utf8mb4",
            collate : "utf8mb4_general_ci"
        })
    }
    static associate (models){
        models.Post.belongsTo(models.User, {foreignkey : "user_id" , target : "uid", onDelete : "CASCADE"}); // Post가 User한테 user_id 외래키를 받는다.
        models.Post.belongsTo(models.Category, {foreignkey : "category_id" , target : "name", onDelete : "CASCADE"}); // Post가 Category한테 category_id 외래키를 받는다.
    }
}

module.exports = Post;