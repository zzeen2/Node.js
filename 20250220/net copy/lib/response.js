const fs = require('fs');
const path = require('path')

const STATEMESSAGE = {
    200 : "ok",
    404 : "NOT FOUND"
}

function a() {
    return function () {
// 함수가 함수를 반환하는 함수
    }
}

// 요청에 대한 응답 메세지 작성할 함수
const getMessage = (request) => (body, stateCode = 200 ) => {
    const bodyBuffer = Buffer.from(body);

    // 요청한 내용의 컨텐츠 타입을 확인을 해야한다.
    // content-type
    // 응답을 할때 요청한 내용의 컨텐츠를 응답해줘야하니
    // 내가 이 컨텐츠를 응답했어
    const ContentType = request.header.headers.Accept.indexOf("text/html") !== -1 ? "text/html" : request.headers.Accept;

    // HTTP/1.1 200 ok
    // 응답메세지 생성
    return `HTTP/1.1 ${stateCode} ${STATEMESSAGE[stateCode]}
Connection : Close
Content-Type : ${ContentType} charset=UTF-8
Content-Length : ${bodyBuffer.length}

${body}`

}

const temp = getMessage();
/**
 * temp = () => {
 *   const bodyBuffer = Buffer.from(body);
 * }
 * temp("123") === body = 123, stateCode = 200
 * temp("123", 300) === body = 123, stateCode =300
 */

// 클라이언트에게 응답할 객체를 최종 완성 res 객체
const getResponse = (socket,request) =>{
    // meg 매개변수로 body내용과 상태코드 전달해주면 응답 메세지를 반환하는 함수 생성
    const msg = getMessage(request);

    // 응답의 내용을 가지고 있을 객체
    return {
        notFound : (body) => {
            // 잘못된 요청을 했을때 응답할 메서드
            const errorMessage = msg(body, 404);
            socket.write(errorMessage);
            socket.end();
        }, 
        send : (filename) => {
            //응답을 하고 종료 하는 메서드
            //readFileSync 비동기 처리를 해서 동기적으로 async await를 사용하는것과 같은 원리
            // 파일의 경로를 전달하면 파일의 내용을 가져온다.\
            // 두번째 매개변수는 인코딩 방식
            // 파일의 내용을 가져오는동안 기다린다.
            // readFile 비동기 함수

            // 경로를 작성할때 제공하는 내장 모듈이 있다.
            // path.jain("./page", "main", "detail") //> ./page/main/detail
            // 폴더의 경로를 만들어줄때 메서드를 제공한다.

            // nodejs에서 제공하는 전역 변수
            // __dirname : 현재 파일의 폴더 까지의 경로를 제공
            const file = fs.readFileSync(path.join(__dirname, "..", "views", filename + ".html"), "utf8");
            socket.write(msg(file));
            socket.end();
        },
    }
}

//module.exports === {}
// module.exports = f()
module.exports = getResponse; //> 함수의 값만 내보내기