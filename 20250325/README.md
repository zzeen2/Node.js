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