# 시퀄라이즈 사용해서 로그인 게시판에 카테고리

## 유저
1. 회원가입
2. 로그인

## 게시글 카테고리
1. 자유게시판
2. 리뷰게시판

## 게시글
1. 유저가 작성하고 카테고리 설정을 해서 글을 등록하고
2. 해당 카테고리에서 글을 확인

```sh
npm init -y
npm i express mysql2 ejs sequelize bcrypt jsonwebtoken dotenv

# pakage.json의 script는 자주 사용할 명령어를 저장해놓는 구문
#   "scripts": {
#     "test": "echo \"Error: no test specified\" && exit 1",
#     "start": "node server.js",
#     "myDep" : "npm i",
#     "build" : ""
#   },
```

> 프로젝트 파일 이름검색 commend + p

## 리프레시 토큰
> 엑세스 토큰이 만료될 시간이 5분이면, 리프레시 토큰은 한시간으로 잡음
> 엑세스 토큰이 탈취되면 보안상 위험하기 때문에 로그인 상태를 유지시켜주는 토큰
>Access Token은 접근에 관여하는 토큰이고, Refresh Token은 재발급에 관여하는 토큰
출처: https://inpa.tistory.com/entry/WEB-📚-Access-Token-Refresh-Token-원리-feat-JWT [Inpa Dev 👨‍💻:티스토리]

## 시퀄라이즈는 join을 할 때
> 조건문 제한을 걸어놓았다.
> 관계성이 맺어져 있어야만 join 가능