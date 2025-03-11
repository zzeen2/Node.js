show TABLES;

drop TABLE user;

create Table user(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(10),
    user_pw VARCHAR(10) NOT NULL, 
    user_name VARCHAR(10) NOT NULL, 
    create_At DATETIME DEFAULT now()
);
show TABLES;

DESC user;

INSERT INTO user(user_id, user_pw, user_name) VALUES("soon1", "admin123", "이순현");
INSERT INTO user(user_id, user_pw, user_name) VALUES("aoon2", "admin123", "이순현");
INSERT INTO user(user_id, user_pw, user_name) VALUES("aoon3", "admin123", "이순현");
INSERT INTO user(user_id, user_pw, user_name) VALUES("soon4", "admin123", "이순현");
INSERT INTO user(user_id, user_pw, user_name) VALUES("soon5", "admin123", "이순현");

SELECT * FROM user;

SELECT * FROM users WHERE user_id LIKE 'A%';


ALTER TABLE user RENAME users;

DESC users;
ALTER TABLE users CHANGE user_name name VARCHAR(20);

ALTER TABLE users MODIFY name VARCHAR(30);

ALTER TABLE users DROP name;

ALTER TABLE users ADD name VARCHAR(10);


CREATE USER 'myid'@'localhost' IDENTIFIED BY 'admin123!';
# myid : 새로만드는 유저의 이름
# localhost : 새로 생성하는 유저가 커넥션 요청할수 있는 호스트

## 모든 호스트에서 접속
CREATE USER 'myid'@'%' IDENTIFIED BY 'admin123!';
## IDENTIFIED BY 뒤에 admin123! 비밀번호

## 유저에게 데이터베이스 권한 부여
GRANT ALL PRIVILEGES ON soondata.* TO 'myid'@'localhost';
## ALL PRIVILEGES 이건 모든 쿼리 접근을 허용하겠다.
## SELECT 나 INSERT 등 권한을 명시해서 사용하게 할수도 있다.

## 권환 리프레시 적용
FLUSH PRIVILEGES;

## 권한 확인
SHOW GRANTS FOR 'myid'@'localhost';

## 권한 철회 
REVOKE ALL PRIVILEGES ON soondata.* FROM 'myid'@'localhost';
REVOKE ALL PRIVILEGES ON *.* FROM 'myid'@'localhost';

## 유저 삭제
DROP USER 'myid'@'localhost';

### 유저 목록 조회

Select user, host FROM mysql.user;

### FROM 어디에서 값을 조회할거냐? 
### use mysql;
### user라는 테이블 접근


ALTER TABLE user AUTO_INCREMENT = 0;