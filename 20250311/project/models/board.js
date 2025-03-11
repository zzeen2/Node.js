const mysql2 = require("mysql2");

const mysqlConnect = mysql2.createConnection({
    user : "myid",
    password : "admin123!",
    multipleStatements : true,
    database : "project",
    host : "localhost",
    port : 3306
})

mysqlConnect.query("SELECT * FROM board",(err, data)=>{
    if(err) {
        console.log("테이블이 없어");
        const sql = 'CREATE TABLE board(id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(15) NOT NULL, content VARCHAR(300) NOT NULL)';
        mysqlConnect.query(sql, (err) => {
            if(err) return console.log(err);
            console.log("테이블이 없어서 테이블 생성했어");
        });
    } else {
        console.log("테이블이 초기화 되어 있어")
    }
})

exports.createBoardData = async (title, content) => {
    await new Promise((res, rej)=>{
        mysqlConnect.query(`INSERT INTO board(title, content) VALUES ('${title}', '${content}')`,(err) => {
            if(err)return rej(err);
            res("글 추가 완료");
        })
    })
}

exports.getBoardData = async () => {
    return await new Promise((res, rej) => {
        mysqlConnect.query("SELECT * FROM board", (err, data) => {
            if(err) return rej(err);
            res(data);
        })
    })
}