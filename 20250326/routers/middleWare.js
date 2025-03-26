const jwt = require("jsonwebtoken")

// 로그인 검증 미들웨어
// 화면을 그리는 목적으로 미들웨어 추가
exports.authMiddleWare = (req,res,next) => {
    try {
        console.log(req.headers.cookie) 
        if(req.headers.cookie){
            const user = req.headers.cookie.split("=")[1];
            const decoded = jwt.verify(user,process.env.SECRET_KEY);
            if (decoded){ // 검증이 되면 값이 있음
                req.user = decoded;
                next();
            }else{
                res.redirect('/user/login'); // 화면그리기, 데이터 보내는거 아님!
            }
        }else {
            res.redirect('/user/login');
        }
        
    } catch (error) {
        res.redirect('/user/login');
    }

}

// 어드민 유저 검증 미들웨어
// 데이터 검증을 위해 json으로 처리
exports.adminMiddleware = (req, res, next) => {
    try {
        if(req.headers.cookie) {
            const user = req.headers.cookie.split("=")[1];
            const decoded = jwt.verify(user, process.env.SECRET_KEY)
            console.log(decoded);
            if(decoded.grade === 2) {
                req.user = decoded;
                req.admin = true;
                next();
            }else {
                req.admin = false;
                next();
            }
        }else{
            res.json({state : 401, message : "카테고리 진입했고 로그인 검증 안됨"})
        }
    } catch (error) {
        res.json({state : 400, message : 'admin 계정 검증 실패'});
    }
}