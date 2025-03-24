// 데이터베이스 커넥션 
const Sequelize = require("sequelize");
const Post = require("./post")
const User = require("./user")
// 커넥션 
const sequelize = new Sequelize( 
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host : process.env.DATABASE_HOST,
        dialect : "mysql"
    }
);



// 유저 테이블 만들고 매핑 user.js
const users = User.init(sequelize);
// 게시글 테이블 만들고 매핑 post.js
const posts = Post.init(sequelize);

const db = {Users : users, Posts : posts, sequelize} // 내보내서 사용하려고 모델 담아놓기
users.associate(db);
posts.associate(db);


sequelize.sync( { force : false } ).then(()=> {
    console.log("database on!")
}).catch((err)=> {
    console.log(err);
})

module.exports = db;