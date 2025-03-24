const {Model ,DataTypes} = require('sequelize');

class Posts extends Model {
    static init (sequelize) {
        return super.init({
            content : {
                type : DataTypes.STRING(100),
                allowNull : false
            }
        }, {
            sequelize,
            timestamps : false,
            underscored : false,
            modelName : 'Post',
            tableName : 'posts',
            paranoid : false,
            charset : "utf8mb4",
            collate : "utf8mb4_general_ci"
        })
    }associate
    static associate(models) {
        models.Posts.belongsTo(models.Users, { foreingKey : "user_name", target : "name", onDelete : "CASCADE" });
    }
}

module.exports = Posts;