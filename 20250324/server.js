// npm i sequelize mysql2 
// npm i dotenv
const {Sequelize, DataTypes} = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize( 
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host : process.env.DATABASE_HOST,
        dialect : "mysql"
    }
);

const User = sequelize.define(
    'User', // 모델 이름(관계형 맺을때 사용)
    {       // 정의할 필드명, 데이터 타입
        id : {
            type : DataTypes.INTEGER, // 숫자타입으로 정의
            autoIncrement : true,     // 자동으로 증가하는 속성 정의
            primaryKey : true         // 기본키로 지정하는 속성
        },
        name : {
            type : DataTypes.STRING,
            allowNull : false         // null의 값이 되면 안된다. NOTNULL
        }
    }, {    // 테이블 속성
        tableName: "users"
        
    }
);
// User 변수에는 테이블 매핑 객체
// User의 객체의 메서드를 사용해서 쿼리 요청을 보낼 수 있다.

sequelize.sync({force : false }).then(async()=> {
    console.log("데이터베이스 동기화")
    // 데이터 생성
    // insert into users (name) values ("zzeen")  = User.create({name : "zzeen"})
    //const data = await User.create({name : "zzeen3"})
    // 생성된 데이터 내용 확인
    //console.log(data.toJSON());

    // CRUD
    // 데이터 조회
    //const data2 = (await User.findAll()).map(e => console.log(e)); <// e값이 뭔지 확인하자
    const data2 = (await User.findAll()).map(e => e.dataValues)
    console.log(data2);
    const data3 = await User.findOne({where : {id:2,name : "zzeen2"}})
    console.log(data3);
    
    // 데이터 수정 
    // Update users SET name = "zzeen123" where id = 3 
    const data4 = await User.update({ name : "zzeen123 "},{ where : { id : 3 } })
    // 반환값으로 수정된 내용이 할당되진 않는다.
    // 반환되는 내용은 수정된 행의 갯수****
    console.log(data4);

    // 데이터 삭제 
    // delete from users where id = 1;
    const data5 = await User.destroy({where : { id : 1 }});
    // 반환되는 값은 삭제된 데이터의 갯수***
    console.log(data5); 
    // ORM 의 단점 : 복잡한 쿼리까지는 제공하지 않는다.
    // 복잡한 쿼리는 우리가 직접 쿼리문을 작성해서 사용해야한다.

    const createORM = (obj) => {
        let query ="insert into users";
        let queryFiled = "("
        let values = "("
        for (const key in obj) {
            queryFiled += key + ",";
            if (typeof obj[key]==="number" ){
                values += obj[key] + ",";
            }else if (typeof obj[key]==="string"){
                values += `"${obj[key]}"` + ",";
            }
        }
        console.log(queryFiled.length)
        const data = queryFiled.slice(0, -1);
        const valueData = values.slice(0, -1);
        // 맨 뒤에서 문자열 하나 잘라서 data에 할당 
        // 시작 인덱스를 0으로잡고, 마지막 문자열을 -1로 전달하면 마지막 문자열 1개 제외하고 메서드서 값 반환
        queryFiled = data + ", createdAt, updatedAt)"
        values = valueData + `"2025-03-24 11:58:00", "2025-03-24 11:58:00")` 
        console.log(queryFiled); //> (name,id)
        console.log(values)
        const queryResult = `${query} ${queryFiled} VALUES ${values}`;
        console.log(queryResult) //> insert into users (name,id) VALUES ("zzeen",1)
    }
    createORM({name : "zzeen3243"})

    // 순서를 맞춰야하는 데이터는 DELETE 할때 인덱스 정렬하고 AUTO_INCREMENT 0으로 속성 초기화 하면 된다.
    // 복잡한 쿼리를 작성해야해서 일반 쿼리 사용하고싶을때
    sequelize.query("create table boards(title VARCHAR(20),content VARCHAR(200));");
}).catch((err) => {
    console.log(err)
});


//--------------------------클래스에서 super 잠시 설명
// class Square {
//     constructor ( _shape) {
//         this.shape = _shape;
//     }
//     say(name, shape){
//         console.log(name,shape)
//     }
// }

// class Box extends Square {
//     constructor (_name,_shape){
//         //super는 부모 생성자를 호출하는 함수
//         //super(_shape); // 부모 생성자 호출
//         // super 부모 생성자 호출 이후에 부모의 인수 say 함수 호출
//         // super 상속받은 부모의 생성자 함수나 부모의 함수를 자식 클래스의 생성자 함수에서 호출할 수 있다.
//         super.say("안녕", "오랜만이야")
//         console.log(this)
//         this.name = _name
//     }
//     // say(){
//     //     console.log(this.name, this.shape)
//     // }
// }

// const box = new Box("쿠팡박스", "사각");
// box.say();

// // 오버라이딩 , 오버로딩 
//-------------------------------------------------

//---------------------------------------
class Posts extends Model {
    static init (sequelize) {
        return super.init({
            content : {
                type : DataTypes.STRING(100),
                allowNull : false
            }
        },{
            sequelize : sequelize,
            timestamps : false, 
            underscored : false, 
            modelName : 'Posts', 
            tableName : 'posts', 
            paranoid : false, 
            charset : "utf8mb4", 
            collate : "utf8mb4_general_ci" 
        })
    }
    static associate(models){
        // users의 자식테이블
        // belongsTo 관계성의 정의를 받는 메서드 부모와의 관계성을 정의하는 메서드
        models.Posts.belongsTo(models.Users, { foreignKey : "user_name", target : "name" })
    }
}