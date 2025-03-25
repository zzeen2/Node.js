// 테이블 매핑 객체

const {Model, DataTypes} = require("sequelize"); // sequelize에서 Model클래스 가져오기

class User extends Model{ // User 테이블 생성하면서 Model 상속받기
    static init (sequelize){
        // 테이블 매핑 객체를 생성하는 생성자 함수 호출 // 부모의 함수의 형태를 바꾸되, 생성자는 필요하기 때문에 호출해서 생성한 객체는 사용
        return super.init({  // 테이블의 속성과 필드명, 필드 속성
            uid : {
                type : DataTypes.STRING(20),
                primaryKey : true
            },
            upw: {
                type : DataTypes.STRING(200),
                allowNull : false
            },
            name : {
                type : DataTypes.STRING(10),
                allowNull : false
            },
            grade : {
                type  : DataTypes.INTEGER,
                allowNull : false,
                defaultValue : 1 //2- admin, 1- user
            }
        },{
            sequelize,
            timestamps : true, // createAt, updatedAt
            underscored : false, // 대소문자 create_at
            modelName : "User", //관계형 맺을떄
            tableName : "users", // 실제 테이블 이름
            paranoid : false, // 삭제시간 추가 (데이터가 실제로 삭제되지는 않음)
            charset : "utf8mb4",
            collate : "utf8mb4_general_ci"
        });
    }
    static associate (models){
        models.User.hasMany(models.Post, { foreignkey : "user_id" , sourceKey : "uid" }); // User가 Post한테 외래키를 user_id라는 이름으로 준다
        models.User.hasMany(models.Category, { foreignkey : "user_id" , sourceKey : "uid" }); // User가 Category한테 외래키를 user_id라는 이름으로 준다
    }
}

module.exports = User;