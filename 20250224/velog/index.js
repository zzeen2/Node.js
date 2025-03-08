const express = require("express");
const app = express();

// 요청 정보를 로깅하는 미들웨어
app.use((req, res, next) => { 
    console.log(`요청 방식: ${req.method}, 요청 경로: ${req.url}`);
    next(); // 다음 미들웨어 실행
});

// 홈 페이지 요청 처리
app.get("/", (req, res) => {
    res.send("홈 페이지");
});

app.listen(3000, () => {
    console.log("서버가 3000번 포트에서 실행 중...");
});