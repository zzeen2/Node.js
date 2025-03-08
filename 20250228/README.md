# 라우터, MVC 패턴 

## 라우터
> 사용하는 API의 형태를 목적에 맞게 나눠서 관리하고 유지보수성을 높여서 라우티을 분리
> API 문서를 작성을 한 뒤에 라우터를 나눠서 유지보수성과 확장성을 높여서 관리
> 라우터를 사용하는 이유는 코드를 구조화시키고 유지보수성을 향상시키기 위해서 사용
> 라우터의 분리의 목적은 기능별로 파일을 분리해서 코드의 가독성과 유지보수성을 향상 시키는데에 목적이 있다.
> 가장 많이 고려하는 부분 코드의 재사용성을 증가시키기 위해서

## express로 라우팅 처리
```js
// server.js
const express = require("express")
const routerBoard = require("./router/board.js")
const app = express();
// 서버의 로직 즉 상태를 관리하는 객체
// 게시판을 관리할 API 
// 미들웨어로 추가
// 메서드 상관없이 
// 모든 경로 요청에서 처리가 된다.
app.use("/board", router); // /board로 요청을 보내면 

app.get('/', (req,res)=> {
    res.send("메인페이지")
})
app.get('/', ()=> {

}) 
app.listen(3000, ()=> {
    console.log("server on~");
})

// router/board.js----------------------------------------------------------------
// router/user.js
const router = require("express").Router();
// 핸들러 함수를 콜백으로 등록할 수 있는 router객체를 제공

// GET / HTTP/1.1
// /board/
router.get('/', (req,res)=> {
    res.send("게시글 출력")
})
// /board/create
router.post('/', (req,res)=> {
    res.send("게시글 추가")
})
module.exports = router;

```

## MVC 패턴을 활용해서 디렉터리를 분리
> MVC 패턴은 사용자의 인터페이스 UI와 어플리케이션 로직을 분리하자. (화면 보여주는 로직과 기능의 로직을 분리하자.)
> MVC패턴이 등장

> MVC 패턴을 사용한 목적성은 모든 UI나 비즈니스 로직등의 데이터 처리가 하나의 파일에 작성이 되면 유지보수성과 가독성을 해치기때문에 문제가 발생했다. 그래서 코드의 구조화를 시켜서 관리를 하기 위해서 
> `보일러 플레이트`(자주사용하는 형태를 정의해놓는것.) 폴더의 구조를 보일러플레이트화 한다.

## Model
> 데이터와 관련된 로직을 처리하는 파일을 관리하는 폴더
> 데이터베이스의 로직을 처리할 파일을 관리하는 폴더
> 데이터 조작

## View 
> 사용자의 인터페이스. 즉 화면 UI화면의 파일을 관리하는 폴더
> 사용자 UI

## Controller
> model과 view의 상호작용. 데이터의 전달의 과정을 컨트롤 한다. 
> 데이터의 구조를 정의해서 요청을 보내서 응답. 데이터의 저장 혹은 조회
> 제어하는 로직을 작성
> 사용자의 기능 호출

```sh
server.js
- model
    - user.js
    - board.js
- views
    user
        - login.ejs
        - signup.ejs
    board
        - main.ejs
        - create.ejs
        - update.ejs
- controllers
    - userController.js # 사용자 로그인 관련 함수 기능. 회원가입 관련 기능
    - boardController.js # 게시글 등록의 기능. 게시글 조회의 기능
```


## 실습 과제
> ud 추가
> 회원가입할때 닉네임을 작성하고
> 닉네임을 수정할수 있는 페이지에서 닉네임 수정
> 회원 탈퇴 요청을 보내면 회원 정보 삭제

> 추가 과제: 게시판 주말동안 완벽하게 끝나서 10시 드라이브에 업로드