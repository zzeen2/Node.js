const { userSelectAll, userFindUid, userCreate } = require("../models/user");

exports.signup = async (req) => {
    const {uid, upw} = req.body;

    const isSignUp = await userFindUid({uid});
    if(isSignUp) {
        return {state : 201, message : "중복된 로그인 입니다."}
    }else {
        userCreate({uid, upw});
        return {state : 200, message : "가입 성공"}
    }
}