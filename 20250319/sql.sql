create table users(
    name VARCHAR(10),
    age INT
)

create index idx_user_age ON users(age);

show index from users;

CREATE TABLE student(id INT PRIMARY KEY, name VARCHAR(50), email VARCHAR(50), age INT, class VARCHAR(20) )

## mysql 의 외부 csv 파일은 지정된 접근 경로에 있는 파일을 업로드 할 수 있다.
SHOW GLOBAL VARIABLES LIKE "local_infile"

set GLOBAL local_infile=On;

SET GLOBAL secure_file_priv = "";
SHOW VARIABLES LIKE "secure_file_priv";
drop Table student;

SELECT * from student;

LOAD DATA INFILE "/opt/homebrew/etc/uploads/student.csv"
into TABLE student
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

select * from student;
## 전체를 조회하는 쿼리 ( full scan )
## id 기본키를 가지고 조회가 일어난 것.
## index가 되어있다면 전체 조회할때 데이터를 좀더 빠르게 조회할 수 있다.
## index를 사용하는 목적은 조건에 맞는 데이터를 빠르게 조회하기 위해서

select * from student WHERE class="blockchain";

explain select * from student WHERE class="blockchain";

## 데이터의 값이 많고 조회를 할때 인덱싱이 되어있지 않으면 조회의 속도가 느리다.
## 조회하는 값이 숫자가 아니고 문자는 사전적 순서로 정렬 후 btree로 조회한다.
select * from student WHERE name ="Bennett12";

## 인덱스를 생성해서 바로 위를 조회하면 훨씬 빨라짐 
create index idx_student_name ON student(name);
create index idx_student_email ON student(email);

show index from student;
drop index idx_student_name on student;

select * from student WHERE email ="Delpha_Fay17@yahoo.com"

select * from student WHERE name = "Roosevelt.Batz" and email ="Delpha_Fay17@yahoo.com"

### explain : 조회할때 사용한 인덱스의 값이 무엇인지 확인하는 명령어
EXPLAIN select name, email from student where name ="Roosevelt.Batz";

### 인덱스를 설정한다는 것이 즉 테이블의 데이터의 영역에 인덱스의 내용도 저장이 된다는 얘기
### 인덱스를 설정하면 추가적인 데이터도 저장이 된다. 무분별하게 쓰면 오히려 느려질 수 있음 !
### 데이터가 추가되면 인덱스의 정보도 모두다 갱신한다. 그래서 데이터 추가부분이 오버헤드된다.

### 멀티 컬럼 인덱스
### 두가지 이상의 컬럼으로 유니크 인덱스 생성
create UNIQUE INDEX idx_student_name_email ON student (name,email)
## 왼쪽 기준으로 선택한 인덱스의 기준으로 인덱싱 된다.

## email은 따로 인덱스가 필요하다.
create index idx_student_email ON student(email);

## mysql에서 옵티마이저 sql을 실행할때 가장 효율적으로 실행할 수 있는 방법을 결정 
## 옵티마이저가 오휴를 발생시킬수도 있을 경우가 있기때문에 확인을 잘 해보고 사용해야한다.
## 이상한 인덱스를 사용하고있는 경우 

### mysql에서 옵티마이저에게 인덱스를 제시 
### use index : 왠만하면 이 인덱스를 사용해라
select * from student use INDEX(idx_student_email) WHERE email = "Delpha_Fay17@yahoo.com";

### 효율적이지않은데 말을 안듣는다.
### 강제로 인덱스 사용을 하게 할 수 있다.
select * from student FORCE index(idx_student_email) WHERE email = "Delpha_Fay17@yahoo.com";

