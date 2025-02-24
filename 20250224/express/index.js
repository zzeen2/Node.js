const express = require('express');
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")))
// 정적 라우팅 ( 파일의 형태로 요청을 보냈으면 확장자가 붙은 형태의 Url에 파일의 이름과 확장자가 포함된 형태 )

const PORT = 3000;
// GET /HTTP/1.1
// 요청 메세지에 GET의 요청이 들어왔을때
// 요청이 get이고 경로가 / 면 호출할 콜백 전달.

// 라우팅 처리
// 요청 URL 경로에 따라서 클라이언트에게 어느 헨들러를 호출해서 응답을 줄건지.  
app.get('/', (req, res)=> {
    // req 요청 메세지를 파싱한 객체 즉 요청 객체
    // res 응답 메세지를 만들어주는 객체 응답 객체
    // console.log(req);
    console.log("안녕");
    const filePath = path.join(__dirname, "views", "index.html");
    fs.readFile(filePath, "utf8", (err,data)=> {
        if (err) return res.send("404 페이지가 존재하지 않는다.")
            res.send(data);
    })
})

app.post("/", (req, res)=> {
    res.send({uid : "soon"})
})

app.listen(PORT, () => {
    console.log("server on~")
})