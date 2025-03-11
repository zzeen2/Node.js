# 데이터 베이스

## 데이터 조회 조건
```sql
CREATE TABLE user(
    user_id VARCHAR(10) PRIMARY KEY,
    user_pw VARCHAR(10),
    user_name VARCHAR(10),
    create_At DATETIME DEFAULT now()
);

INSERT INTO user(user_id, user_pw, user_name) VALUES ('soon', "admin123", "이순현");
INSERT INTO user(user_id, user_pw, user_name) VALUES ('aoon2', "admin123", "이순현");
INSERT INTO user(user_id, user_pw, user_name) VALUES ('soon3', "admin123", "이순현");
INSERT INTO user(user_id, user_pw, user_name) VALUES ('soon4', "admin123", "이순현");

// 문자열의 시작이 어떤 문자로 시작하는지
// S로 시작하는 문자열을 찾겠다.
SELECT * FROM user WHERE user_id LIKE "S%"

// S로 끝나는 문자열을 찾겠다.
SELECT * FROM user WHERE user_id LIKE "%S"

// 테이블의 이름을 변경
ALTER TABLE user RENAME users;

// 컬럼의 이름과 데이터 타입을 잘못 만들었다.
ALTER TABLE users CHANGE user_name name VARCHAR(20);

// 필드의 데이터 타입만 변경하고 싶다
ALTER TABLE users MODIFY name VARCHAR(30);

// 필드를 제거 하고 싶다.
ALTER TABLE users DROP name;

// 필드를 추가 맨뒤로 필드 추가
ALTER TABLE users ADD name VARCHAR(10);

// 필드 추가를 맨 앞에 추가 하고싶다.
ALTER TABLE users ADD name VARCHAR(10) first;
```

### 데이터베이스의 유저 관리

```sql
// 루트 계정을 사용하면 
// 외부에서 root 계정을 사용하다보면 보안적인 이슈가 발생할수 있다.
// 데이터베이스의 모든 권환과 유저 관리 권한을 모두 가지고 있는 계정이기 때문에
// 협업을 할때 모든 팀원에게 root계정을 알려줄순 없으니
// 유저를 생성하고 권한을 부여해서 유저계정을 추가해서 데이터베이스 접근 권한을 주고 사용하자

mysql -u root -p;
// 접속해서 유저 계정 생성
// root 계정으로 접속해서 유저를 생성하고 권한을 부여

```

### mysql 서버 즉 드라이버 실행
> 커넥션을 맺기 위해서 사용하는 것.
> nodejs 런타임환경에서 커넥션을 맺어야한다
> 설치할 드라이버가 mysql2 라이브러리를 설치.
> 라이브러리 말하는거임 mysql 콜백 방식만 제공을 하고
> mysql2를 설치하는 이유가 promise 기반의 메서드를 제공한다.
> mysql2 공식문서에서도 권장하는 모듈

```js
// npm i mysql2

const mysql = require('mysql2');
// 드라이버에 필요한 값
// 커넥션 맺을때 필요한값
// 이름
// 비밀번호
// 데이터베이스이름
// 호스트
// 포트

```


##
```sh
 npm i express ejs mysql2
 
```