const {request : {getRequest} } = require('./lib/request')
//{ request : {getRequest}} 
const net = require("net")
const getResponse = require ("./lib/response")

const server = net.createServer((client) => {
    //client.setEncoding("utf8")
    let buffer = Buffer.alloc(0); // biffer를 사용할 변수로 그냥 정의해놓은것 . 데이터를 받을 목적 아님
    client.on('data', (chunk) => {
        //console.log(chunk);
        // concat 바이너리 데이터를 이어붙힌다. [0, 1, 2] ==> 0 1 2 
        buffer = Buffer.concat([buffer,chunk]) //> 원하는 청크만큼 길이를 만들어줌
        //getHeaders(buffer.toString());
        const req = getRequest(buffer);
        const res = getResponse(client, req);

        // 요청 경로에 따라서 사용자가 필요한 데이터를 응답해주는 것(백엔드의 목적)
        // API 문서. 어떤 경로에 요청을 보내면 어떠한 데이터의 형식과 데이터의 타입을 받을 수 있는지
        if(req.header.startLine.url === "/"){ 
            //console.log("루트경로로 요청했고 데이터는 1")
            res.send('index');
        }else if (req.header.startLine.url === "/boardData"){
            //console.log("/boardData 경로로 요청 받았고 게시글 데이터 응답")
            res.notFound("에러 페이지")
        }

        //console.log(req);
    })
})

server.listen(3000, () => {
    console.log("서버 on")
});



// const http = require("http");

// const server = http.createServer((req,res) => { 
//     console.log(res); //> 객체 안에 문자열로 저장된 키값은 대괄호로 접근, 아닌건 .표기법 사용가능 
//     res.setHeader("Content-Type", "text/plain; charset=utf-8")
//     if (req.url === "/"){ // 요청 url에 따라서 응답 내용이 달라짐
//         res.end("여기는 메인 페이지")
//     }else if (req.url === "/shop"){
//         res.end("상품 페이지")
//     }
//     //console.log(res);
//     res.end("ddd")
// })
// // GET / HTTP 1.1

// server.listen(3000, () =>{
//     console.log("서버가 잘 열렸어")
// })
