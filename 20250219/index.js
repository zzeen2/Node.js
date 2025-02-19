// TCP 서버 구현

// net 내장 모듈
// http 보다는 이전 내용의 라이브러리

// 모듈 (net 내장 모듈)
const net = require('net');
const PORT = 3000;

// 서버 객체 생성
// 요청을 받았을때 호출할 함수의 내용을 매개변수로 전달
const server = net.createServer((client) => {
    console.log(client)
    // 클라이언트가 서버에 접속을 하면 콜백함수 실행 
    // 요청의 데이터를 받으면 
    // 바이너리 데이터 형식의 데이터를 받는다.
    // utf8의 형식으로 문자열 인코딩
    client.setEncoding('utf8')
    // data는 클라이언트에서 메세지를 받았을때 요청을 받았을때
    // GET, POST 기본적인 요청 방식
    // GET은 값을 조회할 용도로사용하는 방식. 민감한 데이터는 GET요청에 포함시키지 말자. 게시글의 내용만 조회할때
    // POST는 값의 조회 용도 뿐만 아니라 값을 전달하는 목적도 가지고 있는 방식 안전하게 값을 전달하는 방식

    // 객체로 문자열을 파싱한 내용이 요청객체 (req)
    // 헤더의 내용에서 중요한 값들- 요청방식과 컨텐츠의 타입
    // index << 이런식으로 요청 경로에 따라서 어떤 내용의 데이터를 요청했는지를 판별한다.
    // GET / index HTTP/1.1 // 요청방식은 GET방식, 버전은 1.1 버전을 사용하고있다. 
    // 1.1 버전은 지속적인 연결을 할수 있게 됐다. 캐시작업 인증 에러처리등의 기능이 개선됨
    // 호환성 비교적으로 간단하게 구현이 가능해서. 가장 큰 이유는 1.1 버전을 사용하면서 굳이 2버전을 사용할 이유가 없기때문에 
    // 옛날에 만들어진 브라우저들은 2버전을 지원하지 못하는 경우가 있을 수 있다.

    // Host: localhost:3000 // 서버 호스트의 주소와 포트 서버는 요청을 허용한 클라이언트에서 요청을 보냈는지

    // Connection: keep-alive // 서버와 연결을 유지해라
    // sec-ch-ua: "Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132" // 
    // sec-ch-ua-mobile: ?0
    // sec-ch-ua-platform: "macOS"
    // Upgrade-Insecure-Requests: 1
    // User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36
    // Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
    // Sec-Fetch-Site: none
    // Sec-Fetch-Mode: navigate
    // Sec-Fetch-User: ?1
    // Sec-Fetch-Dest: document
    // Accept-Encoding: gzip, deflate, br, zstd
    // Accept-Language: ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7

        client.on('data', (data) => {
            console.log(data);
                // 1요청 1 응답
            const body =`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div>안녕<div>하세요
    <ul>
        <li>아잋템</li>
        <li>아잋템</li>
        <li>아잋템</li>
        <li>아잋템</li>

    </ul>
</body>
</html>`

        // 서버에서 클라이언트에게 응답 헤더
        // 응답을 할 때 숫자로 표현한 상태의 내용 
        // 100
        // 200 성공
        // 300 리다이렉트
        // 400 실패 클라이언트 측에서 실패
        // 500 서버가 에러발생

        const resHeader = `HTTP/1.1 200 ok
        Content-Type : text/html
        Content-Length : ${body.length}

        ${body}
        `
        client.write(resHeader);
        // end 메서드는 응답을 하고 종료
        client.end();
    })  
}) 

server.listen(PORT, ()=> {
    console.log("서버 잘 열림~") 
})