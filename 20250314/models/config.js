const mysql2 = require("mysql2/promise");

const connectPool = mysql2.createPool({
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE_NAME,
    host : process.env.DATABASE_HOST,
    port : process.env.DATABASE_PORT,
    multipleStatements : true
})

// 커넥션 확인
connectPool.getConnection((err)=> {
    console.log(err);
})

// 테이블 초기화
const userTableInit = async () => {
    try {
        await connectPool.query('SELECT * FROM users');
    } catch (error) {
        console.log("테이블 없음")
        await connectPool.query("CREATE TABLE users(id INT AUTO_INCREMENT PRIMARY KEY, uid VARCHAR(10) NOT NULL, upw VARCHAR(128) NOT NULL, name VARCHAR(10), nick VARCHAR(10), imgpath VARCHAR(100) )")
        console.log("테이블 만들었어");
    }
}

userTableInit();

module.exports = connectPool;