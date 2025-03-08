// 비즈니스 로직을 작성
// 유저의 회원가입과 로그인의 로직을 작성

// (view)사용자 기능 호출 -> controller -> model

const User = require("../models/user")

const signup = (req, res)=> {
    // 미들웨어로 body
    const {uid, upw}= req.body;
    // 요청객체 응답객체를 받아서 처리하는 로직
    // 조건문 처리 로직
    // 유저가 회원가입을 할수 있는지 체크
    // 예) 아이디가 동일한 유저는 있을수 없으니?
    // 비즈니스 로직에서 처리를 해서 
    // 입력한 값이 정해진 정규식에 맞게 작성된 내용인지 한번더 체크 
    const [isSign] = User.selectUserId(uid); // 중복이 안되면 값이 없으니
    console.log(isSign)
    if(!isSign){
        User.signupUser(uid,upw);
        res.redirect('/user/login');
    } else {
        res.send("아이디가 중복됩니다");
    }
}



const login =(req,res) => {
    const {uid, upw} = req.body
    
    const [isLogin] = User.selectUser(uid, upw); //[], [{uid : "wldms", upw : "123"}]
    //값이 없으면 undefinde
    //값이 있으면 {uid : "wldms", upw : "123"}
    if(isLogin){
        res.send('로그인 성공')
    } else
        res.send("ddddd")

}
module.exports = { signup,login };