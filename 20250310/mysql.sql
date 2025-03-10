# 테이블 생성
# 상품테이블 상품이름

# table 조회
show TABLES;
# table 생성(액섹 파일 하나 생성)
#create TABLE 생성 table이름 ( 필드명 타입 옵션, 필드명 타입 옵션, ... );

# AUTO_INCREMENT 값을 추가하지 않아도 자동으로 증가 시키는 옵션
# 값을 임의로 저장할 수 없다.
# PRIMARY KEY 기본키. 고유식별자로 사용할 키 값이다.
# 데이터베이스의 검색 엔진에서 값을 효율적으로 찾을때 사용된다.
# 인덱싱 중요 백엔드 쉬운데 필수 개념
CREATE TABLE store ( 
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(10) 
);

### 테이블의 필드명 확인
DESC store;

### 테이블 값 추가
INSERT INTO store ( name ) VALUES ( "상품1")

### 값 조회
SELECT * FROM store;

### 유저 정보 테이블 
### NOT NULL 옵션은 옵션의 값이 null 값이면 데이터를 저장하지 않겠다.
### DATETIME 날짜 타입을 선언하는데 옵션으로 기본값 설정
### now() 함수가 SQL문 실행할때 포함되어 있고 now() 년도 날짜 시간 분의 현재 시간의 내용을 생성해준다.
CREATE Table user( id INT AUTO_INCREMENT PRIMARY KEY ,user_id VARCHAR(10) NOT NULL, user_pw VARCHAR(10) NOT NULL, data DATETIME DEFAULT now());

SHOW TABLES;

### create
INSERT INTO user (user_id, user_pw) VALUES ("zzeen4", "1234");

### read
### * 부분 
### select 조회할 테이블의 필드명 from 테이블 이름
SELECT user_id, user_pw FROM user;
SELECT * FROM user;

### 테이블에 zzeen2라는 값이 저장되어 있는지 확인하고 있으면 조회
### WHERE 조건문을 사용해서 원하는 값이 포함된 필드의 값을 찾아서 조회한다.
### WHERE 조건문에 같이 사용할수 있는 옵션 구문 AND 와 OR
SELECT * FROM user WHERE user_id="zzeen2" AND user_pw="1234";
SELECT * FROM user WHERE user_id="zzeen2" OR user_pw="123";

### 테이블의 값을 수정 update
### SET 값을 할당하는 옵션 WHERE을 SET으로 변경
UPDATE user SET user_id="zzeen2" WHERE  user_id="zzeen5";
UPDATE user SET user_pw="1234", user_id="zzeen2" WHERE  id = 2;

### 테이블 값 삭제 
DELETE FROM user WHERE id =3;

### 삭제
drop Table user;

show TABLES;

## 기본 키값이 없어
### 고유 식별자가 없다
### 기본키는 고유식별자. 하나의 테이블에 하나의 필드만 존재할수있다.
### 유니크 키는 테이블의 여러개의 필드를 생성할 수 있다.
### 조회가 빈번하게 일어나지 않는 테이블은 기본키가 없이 만드는게 더 효율적이다.
### 데이터의 생성이 많이 일어난다 그럼 기본키를 생성하게 되면은 데이터를 추가하는 속도가 느려진다. 
DESC user;

## 테이블의 쿼리문 내용 요약

# 모든 테이블의 조회
SHOW TABLES;

# 데이터베이스의 사용
use [데이터베이스 이름];

# 테이블의 필드 확인
DESC [테이블 이름];

# 테이블 필드 값 모두 조회
SELECT * FROM [테이블 이름]; 

# 테이블의 선택 값 조회
SELECT [필드명, 필드명2] FROM [테이블의 이름];

# 테이블의 값을 조회할때 내림차순, 오름차순
# 오름차순
SELECT * FROM [테이블 이름] ORDER BY [필드이름] ASC
# 내림차순
SELECT * FROM [테이블 이름] ORDER BY [필드이름] DESC 