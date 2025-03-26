// 유저 모델 가져오기
const { User}  = require("../models/config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const userController = {
    async signup(uid, upw, name) {
        try {
            if((uid.trim() !== "") &&(upw.trim() !== "") && (name.trim() !== "")){ // 예외처리
                // 비밀키를 추가해서 비밀번호를 해시 암호화
                const upwHash = bcrypt.hashSync(upw, 10);
                await User.create({uid,upw:upwHash,name}); // 객체 키값 테이블 필드랑 동일하게 전달해야함 !!!!!
                return {state:200, message:"회원가입 성공"}
            }
            return {state :401, message : "빈값이 없이 작성하세요"}
        } catch (error) {
            return {state:400, message : error} // 중복입력시 여기서 에러 드니까 팝업 띄워주기
        }
    },
    async login(uid, upw){
        try {
            const data = await User.findOne({where : {uid}}) // jwt에 담을 유저 정보는 아이디, 이름, 계정의 권한
            // 만약 데이터가 없으면 Null반환
            const userCompare = bcrypt.compareSync(upw, data.dataValues.upw); //> True or false 반환

            if(!data) return {state:401, message:"일치하는 유저가 없습니다"}

            if(data && userCompare) {
                const {dataValues: {uid, name, grade}} = data; // 이거 구조분해하는거 다시 보기
                const token = jwt.sign({uid, name, grade},"zzeen",{expiresIn : "10m"})
                return {state:200, message:"로그인 성공", token}
            }else {
                return {state:402, message: "비밀번호가 일치하지않습니다."}
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = userController;