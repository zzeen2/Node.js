// 데이터 조작
const connectPool = require("./config");

// 유저 생성
const createUser = async (uid, upw, name, nick, imgpath) => {
    try {
        await connectPool.query("INSERT INTO users (uid, upw, name, nick, imgpath) VALUES(?,?,?,?,?)", [uid, upw, name, nick, imgpath] );
        console.log("tlfgod")
        return {state : 200 , message : "회원가입 완료"}
    } catch (error) {
        console.log(error)
    }
}

// 유저 정보 조회
const userSelectFromUid = async (uid) => {
    try {
        const [[data]] = await connectPool.query("SELECT * FROM users WHERE uid=?", [uid]);
        return data;
    } catch (error) {
        return error;
    }
}

module.exports = {createUser, userSelectFromUid};