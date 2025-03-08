const express = require("express");

const app = express();
// 임시 데이터베이스
const data = [];

app.set("view engine", "ejs");

// body의 파싱 내용을 추가
// use 메서드 상관없이 미들웨어 호출
// 가장 위에 호출을 시키기위해서 위에 배치
// GET POST 상관없이 요청 경로만 확인
// 경로를 전달하지않으면 모든 경로
// url의 문자열 형태를 객체로 파싱하는 기능을 하는 함수(핸들러 함수)를 반환
// 문자열에서 깊은 객체도 포함해서 파싱을 할것인지 아닌지
// {name : {age : {}}}
// extended : false 기본적으로 사용 안함. 사용해야될 경우는 true로 주면 된다. 
app.use((express.urlencoded({extended : false})))
// app.use((req,res,next)=> {
//     // body라는 key
//     req.body = "문자열을 파싱해서 객체의 내용을 추가"
//     next();
// })
console.log(app);

// GET/ HTTP/1.1
app.get("/", (req,res) => {
    // render( 파일의 경로, 전달하는 데이터 객체)
    // 기본적으로 설정되어있는 경로 "/20250227/views"
    // view의 key에 value인 경로에접근해서 파일을 찾는다.
    // 바꾸고 싶으면 app.set("views", path.join(__dirname, "page")); << 이런식으로 변경해야함
    // app.set("view engine", "ejs");엔진을 사용하게 되면 확장자를 사용하는 엔진의 파일 확장자 명을 찾는다. .html  > .ejs
    // 페이지를 완성할때 참조할 수 있는 값을 전달한다.
    // 서버에서 페이지를 완성할떄 필요한 값. 즉 페이지를 서버에서 완성시킨다.

    //const data = [{index :1, title:"제목", content : "내용"}, {index :2, title:"제목", content : "내용"}];
    res.render("index", {name : "soon", count : 5, board : data });
    // res.send("안녕") << 얘는 따로 설치할거 없이 잘 나옴

})

app.get('/detail', (req,res) => {
    //console.log(req.query.index);
    const _data = data[req.query.index] ;
    //{index : 1, title : 어쩌구~, content: 어쩌구!}
    console.log(data) //[ { index: 1, title: 'dfd', content: 'fdfdf' } ]
    console.log(_data) //{ index: 1, title: 'dfd', content: 'fdfdf' }
    res.render("detail", _data); // detail.html에 _data 넘겨줌
})

//POST / HTTP/1.1
// POST는 body의 내용을 요청메세지에서 사용할 수 있다.
// POST는 안전하게 값을 전달해서 값을 요청 메세지로 전달해서 서버 로직에서 파싱해서 사용
//POSTMAN : api를 테스트할때 사용 프론트에서 구현이 되지않은 상태에서
// 백엔드 개발자가 요청을 보내서 데이터를 확인할때 test로 사용
//redirect === 300 번대의 상태코드를 반환
// 브라우저에서 서버로 요청을 보내고 받은 응답은? 야 다시 여기로 재요청해
// 브라우저는 2번을 요청하게 된다.
// post/board 요청을 보내고 나서 받은 응답은 /로 get요청을 보내
// "/" 경로로 get요청을 보낸다.
// post 요청 다음 get요청 일어남
app.post("/board", (req,res) =>{
    //res.send("글 작성 완료")
    // body내용을 가져와서 데이터를 추가해주고싶어
    // req 요청 메세지 파싱할때 body의 내용을 추가
    //console.dir(req.body.title); // 기본적으로 바디내용이 파싱이 되어있지않음 >> 

    // 임시 데이터베이스
    data.push({index : req.query.index + 1, title : req.body.title, content : req.body.content})
    console.log("dkssud")
    res.redirect("/");
})

app.post("/delete", (req, res) => {
    const index = req.body.index


    // index = req.body.index
    // data.splice(index,1 );
    // console.log(data)
    res.redirect("/");
});

app.listen(3000, ()=> {
    console.log("server on")
})

