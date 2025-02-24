## 라우팅이란 
> 라우팅이란 특정 엔드 포인트에 대한 클라이언트 요청에 서버가 응답하는 방법을 결정하는 것으로, 이 챕터에서의 라우팅은 화면에서 다른 화면으로 전홯나느 네비게이션 기능이라고 생각하면 된다.

> html페이지에  css 파일과 js 파일이 같이 존재하는 경우 웹브라우저에서는 웹서버에게 css파일과 js 파일들(정적인 파일)을 따로 요청해서 해당 파일들을 가져와야한다

https://contents.premium.naver.com/codetree/funcoding/contents/220608194847140ab

https://bitkunst.tistory.com/entry/Nodejs-express-4-%EC%A0%95%EC%A0%81%EC%9D%B8-%ED%8C%8C%EC%9D%BC-%EC%B2%98%EB%A6%AC%ED%95%98%EA%B8%B0


### 엔드 포인트
> URI(경로)와 HTTP 요청 메서드 (get, post, put, delete 등)로 구분된 클라이언트 요청


# Express
> nodejs 환경에서 프레임워크 형태나 라이브러리를 사용해서 
> 서버의 api를 쉽게 만들수 있다.

> app.METHOD(PATH, HANDLER); 라우트 구조
- app : express 인스턴스
- METHOD : HTTP요청 메서드
- PATH: 서버에서의 경로
- HANDLER : 라우트가 일치할때 실행되는 함수

## 장점
> 코드의 간결성 최소의 코드로 서버 로직을 작성할 수 있다.
> 미들웨어 사용도 간단해진다. 요청과 응답 간에 기능을 추가
> 라우팅의 코드 간결성 api를 쉽게 구성할 수 있다.
> 템플릿 엔진 지원 서버측에서 문자열로 페이지로 구성하고, 자바스크립트 영역에 내용을 포함시킨 뒤 페이지를 완성해서 응답을 해주는 엔진

## express 설치
```sh
# pakage.json 
# 초기화
# pakage.json << 내가 작업하는 프로젝트의 내용
# 어떤 의존성 라이브러리를 사용하고 있는지
npm init
npm init -y 
# pakage.json에는 프로젝트에서 혹은ㅇ 라이브러리에서 사용하는 의존성이 기록된다.

# npm i [설치할 라이브러리]
# npm install 배포가 되어있는 라이브러리를 설치한다.ㄷ
# npm uninstall 설치한 라이브러리 제거
# npx 설치한 node에 내장된 명령어를 실행할때

npm i express;

# 여러개의 라이브러리를 설치
npm i express ejs mysql;

```
## 미들웨어 추가
> 미들웨어: 요청이 들어오면 기능을 실행시키는 것 
> 미들웨어는 요청과 응답간의 사이에 
> 미들웨어가 여러개 있다면 첫번째 미들웨어가 먼저 호출된다.
```js
const express = require("express")
const app = express();

app.get( '/', (req,res,next)=> { //> 세번째 매개변수인 next : 다음 미들웨어를 호출
// 로그인 인증 관련된 라우팅 처리할때 등등
    next();
})

app.get( '/', (req,res)=> {
    res.send('안녕')
})

app.listen(3000, ()=> {
    console.log("server on~")
})

```

# 정적파일 라우팅 미들웨어 추가

```js
const express = require('express');

const app = express();

// use 사용할 미들웨어 추가
// use 경로를 넣을수도 있고 안넣을수도 있다.
app.use('/main', ()=> {
    // next 호출하는 때가 있을 것
})

// 모든 요청에서 사용할 미들웨어
app.use(()=>{
    
})

// express.static 정적 라우팅 처리를 하는 미들웨어를 반환
app.use(express.static(path.join(__dirname, "public")));

app.listen(3000, ()=> {
    console.log("server on ~")
})
```

## 게시판 안에 내용
```js
const boardContent = [{title: "", index : 0, content : ""}, {}, {}]

// 브라우저에서 처리하는 방식
// 브라우저에서 해석한 자바스크립트 구문에서 bom제어하는 방식

// 템플릿 엔진을 사용
// 서버측에서 요소를 제어해서 내용을 응답

// 템플릿 엔진의 자바스립트 영역
`${}` : 이런 템플릿 리터럴 처럼 
for(let i = 0; i< boardContent; i++){

}
<html>
    <header></header>
    <body>
    <!--반복문 호출 -->
    % for (let i = 0; i <boardContent.length; i++) {%
    <div> %=boardContent[i].title %</div>
    % }%
    </body>
</html>

=> 브라우저에 응답
<html>
    <header></header>
    <body>
    <div>1</div>
    <div>2</div>
    <div>3</div>

    </body>
</html>

```

브라우저의 자원을 쓰느냐 vs 클라이언트의 자원을 쓰느냐

### 실습과제
> main 페이지
> login 페이지
> board 페이지
> detail 페이지

> 라우팅 처리를 해서 페이지 보여주기, 각각의 페이지는 css를 가지고 있게 정적 라우팅 추가 미들웨어로