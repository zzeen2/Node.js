const mysql = require('mysql2');

// mysql에 커넥션을 맺고 쿼리 요청을 보낼수 있는 메서드를 가지고 있는 객체를 반환
// 이름
// 비밀번호
// 데이터베이스이름
// 호스트
// 포트
const mysqlConnect = mysql.createConnection({
    user : "myid",
    password : "admin123!",
    database : "soondata",
    host : "localhost",
    port : 3306,
    multipleStatements : true
});
// multipleStatements 쿼리문을 잘라서 작업 단위로 다중 쿼리를 실행시켜준다


// query 메서드는 쿼리 요청을 보내는 메서드
mysqlConnect.query("SELECT * FROM user", (err, data) => {
    if(err) return console.log(err);
    console.log(data);
    // 요소 생성
})

const user_id = "soon8";
const user_pw = "1234";
const name = "soon";

// 유저 추가
// mysqlConnect.query("INSERT INTO user (user_id, user_pw, user_name) VALUES( ?, ?, ?)",[user_id, user_pw, name], (err, data)=> {
//     if(err) return console.log(err);
//     console.log("글이 추가되었다.")
// })

// 유저 삭제
// const deleteQuery = 'DELETE FROM user WHERE id=?;';

// const setIndexQuery = 'SET @CNT = 0; UPDATE user SET user.id = @CNT:=@CNT+1;'
// const autoIndexResetQuery = "ALTER TABLE user AUTO_INCREMENT = 0;";

// const queryAll = deleteQuery + setIndexQuery + autoIndexResetQuery;
// mysqlConnect.query(queryAll, [1], (err)=>{
//     if(err) return console.log(err);
//     console.log("글이 삭제됬어")
// })

// 유저 정보 수정
// mysqlConnect.query('UPDATE user SET user_name=? WHERE id=?', ["soon2", 1 ], (err) => {
//     if(err) return console.log(err);
//     console.log("수정 완료");
// })