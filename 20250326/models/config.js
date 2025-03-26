const Sequelize = require("sequelize");
const User = require("./user")
const Post = require("./post")
const Category = require("./category")

// 테이블 연결 준비
const sequelize = new Sequelize(
    process.env.DATABASE_NAME, // 사용할 데이터베이스 이름
    process.env.DATABASE_USER, // 사용할 데이터베이스 계정 이름
    process.env.DATABASE_PASSWORD, // 비밀번호
    { // 사용할 데이터베이스의 속성, 옵션들
        host : process.env.DATABASE_HOST,
        dialect : "mysql",
        port : process.env.DATABASE_PORT
    }
);
// sequelize 연결속성을 포함하고 있는 객체
// 테이블 생성(매핑) 준비 
const users = User.init(sequelize);
const posts = Post.init(sequelize);
const categorys = Category.init(sequelize);

const db = {
    User : users, 
    Post :posts, 
    Category : categorys, 
    sequelize
} // 모델 내보낼때 깔끔하게 내보내기 위해서 , //sequelize 내보내는 이유는 일반 쿼리문을 써야할수도있어서
    
    
// 호출 순서 중요(관계성 때문에)
users.associate(db);
Category.associate(db);
posts.associate(db);


// 최종 연결
// 커넥션 맺는 메서드 sync
// 테이블 생성 함수랑 관계성 함수를 합칠건데, 관계성때문에 순서가 중요하니까 비동기 처리를 해줘야됨 ( 아래 부분을 주석처리하고 나머지 코드를 실행하면 순서가 꼬여서 테이블 생성이 아예 안됨 ) 
// force : 테이블 초기화 할지말지
sequelize.sync({force : false}).then(()=>{
    console.log("sequelize connect")
}).catch(console.log)

module.exports = db;