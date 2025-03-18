CREATE TABLE student (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(10)
)

CREATE TABLE student_class (
    class VARCHAR(20),
    study VARCHAR(20),
    student_id INT
)

show tables;

## 학생 회원가입
INSERT INTO student (name) VALUES("soon");

## 수강 신청
INSERT INTO student_class VALUES("game", "game1", 1);

select * from student;
select * from student_class;

## 학생을 조회하는데 어떤 과정을 신청했는지 조회

SELECT * FROM student LEFT JOIN student_class ON student.id = student_class.student_id;
SELECT * FROM student RIGHT JOIN student_class ON student.id = student_class.student_id;

### 쇼핑몰 요구사항
## 유저가 회원가입을 하고 상품을 주문할 수 있음.
## 주문 정보는 ID,NAME,ORDER_ID
## 유저는 ID, NAME 

### 1. 유저가 있어야 상품을 주문할 수 있다.

### 테이블 설계
### 유저 테이블, 주문 테이블, (상품테이블) 
### 1:n 관계로 유저와 주문 테이블을 만들어야겠다.

CREATE TABLE user (id VARCHAR(20) PRIMARY KEY, name VARCHAR(20));

CREATE TABLE user_order(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20), 
    order_id VARCHAR(20), 
    constraint fk_order_id FOREIGN KEY (order_id) REFERENCES user(id)
    # constraint 필드에서 제약조건으로 사용할 필드를 지정하고 외래키를 생성
    # REFERENCES 부모테이블의 어떤 키를 주시할것인지
)

SHOW TABLES;

## INSERT INTO user_order (name, order_id) VALUES ("맥북", "soon");
## 외래키를 사용해서 제약조건으로 해당 유저가 있을경우 데이터를 추가할 수 있는 테이블을 생성한 것.
## 제약조건이 걸린 오류가 발생했다. 왜 ? 해당 부모의 테이블에 맞는 타켓의 아이디 값을 찾지 못했다. 

## 그렇다면, 유저가 있으면 주문이 가능할까? >> yes(유저가 있어야만 주문이 됨 by 제약조건)
## 유저 생성
INSERT INTO user VALUES("kim", "김");
SELECT * FROM user;
SELECT * FROM user_order;
## 생성된 유저가 상품을 주문
INSERT INTO user_order (name, order_id) VALUES ("자전거", "kim");

### 유저가 주문한 정보까지 필요할 경우 > join 사용
> 단순히 유저의 테이블만 조회하는게 아니고, 주문하는 테이블도 조회가 필요하다.

SELECT * FROM user;
SELECT * FROM user_order;

### 이렇게 하면 가능은 한데 비효율적이다. 쿼리 요청이 두번 들어간다

### 관계성이 있는 테이블은 join을 쓸만하다.
SELECT * FROM user LEFT JOIN user_order on user.id = user_order.order_id WHERE user.id = "soon";
SELECT user.id, user.name, user_order.order_id FROM user LEFT JOIN user_order on user.id = user_order.order_id WHERE user.id = "soon";

### 별칭 