const {DataTypes, Model} = require("sequelize");

class Category extends Model {
    static init (sequelize) {
        return super.init({
            name : {
                type : DataTypes.STRING(10),
                allowNull : false,
                primaryKey : true
            }
        },{
            sequelize,
            modelName : "Category",
            tableName : "categorys",
            timestamps : false,
            charset : "utf8mb4",
            collate : "utf8mb4_general_ci"
        })
    }
    static associate (models){
        models.Category.hasMany(models.Post, { foreignkey : "category_id" , sourceKey : "name" }); // Category가 Post 한테 외래키 category_id를 준다.
        models.Category.belongsTo(models.User, {foreignkey : "user_id", target : "uid", onDelete : "CASCADE"}); // Category가 User의 user_id를 외래키로 받아온다.
    }
}

module.exports = Category;