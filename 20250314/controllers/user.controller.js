const {createUser, userSelectFromUid} = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

//회원가입 로직
const signup = async (uid, upw, name, nick, imgpath) => {
    try {
        const isSignup = await userSelectFromUid(uid);
        console.log(isSignup)
        if(isSignup) return {state : 400, message : "중복된 아이디입니다"}
    
        const pwHash = bcrypt.hashSync(upw, 10);
        const data = await createUser(uid, pwHash, name, nick, imgpath);
        console.log(data);
        return data;
    } catch (error) {
        console.log(error)
        return error;
    }
}

//로그인 로직
const login = async(uid, upw) =>{
    try {
        // 아이디랑 비밀번호를 비교하기위해 유저정보 조회하여 배열 가져오기
        const data = await userSelectFromUid(uid); //uid로 조회해서 행정보를 배열로 가져옴
        //console.log("로그인 로직", data);
        // db랑 아이디 비교
        if (!data) return {state : 401, message : "아이디가 없습니다."}

        // db랑 비밀번호 비교
        const isPasswordCheck = bcrypt.compareSync(upw, data.upw); 
        if (!isPasswordCheck) return {state : 402, messate: "비밀번호가 틀렸습니다."}

        // jwt토큰 생성
        //첫 번째 인자로 토큰에 담을 JSON 데이터(payload) 두 번째 인자로는 키(key).  세 번째 인자를 통해 algorithm 옵션
        const {nick, imgpath} = data;
        const jwtToken = jwt.sign({uid, nick, imgpath}, process.env.TOKEN_KEY, {
            expiresIn : "10m" // 토큰 만료 시간
        })

        return { state : 200, messate : "로그인 성공" , userToken : { token : jwtToken}}
    } catch (error) {
        console.log(error)
        return error
    }
}

// 헤더에 jwt 토큰 추가하기 **********
const loginToken = (req,res,next)=>{
    const data = req.headers.cookie.split("=")[1];
    const userTokenData = jwt.verify(data, process.env.TOKEN_KEY);
    console.log(userTokenData)
    req.user =  userTokenData;
    next();
}


module.exports = {signup, login, loginToken};