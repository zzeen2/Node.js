# mysql의 인덱싱과 B-tree
> 데이터의 양이 많아질수록 슬로우 쿼리가 발생하고 속도가 저하되는 현상이 발생할수 있는데,
> 특정 조건에 맞는 데이터를 조회할때 조회 속도를 빠르게 최적화한다. 검색을 빠르게 할 수 있는 알고리즘을 사용할수 있는것.
> 탐색의 시간복잡도가 줄어든다.

## 인덱스의 구조
- b-tree 인덱스

## mysql의 옵티마이저
> mysql에서 sql쿼리를 호출해서 조회를 할 때 최적화된 조회를 하기위해서 판단해주는 엔진

```sql
create table users(
    name VARCHAR(10),
    age INT,
)
# users의 테이블에 데이터가 10만개 정도로 엄청 많다고 가정해보자. 
# 데이터를 검색할때 전체 순회 ( full scan ) 하면서 조회하기 때문에 속도가 저하된다.
# 따라서 index값을 만들어서 검색에 효율적으로 해준다. 

create index idx_user_age ON users(age);
create unique idx_users_name_age ON users(name, age);


show index from users;
```

## index의 중요성
> table에 저장된 데이터에 대한 접근이 빠른 경로를 제공하는 자료구조이다.

## index의 종류
> index
> 멀티 컬럼 인덱스(유니크)

### b-tree
> 이진 탐색 트리 : 모든 노드의 외쪽 트리는 해당 부모 노드의 값보다 작은 값을 가지고있고, 오른쪽 트리에는 부모 노드보다 큰 값을 가지고 있다. 자식노드는 2개를 가질 수 있다.

> 이진 탐색 트리에서 자식 노드의 개수를 더 많이 가질 수 없을까?
> 이진 탐색 트리를 일반적으로 표현한 것이 B-tree
> 차수로 표현을 하는데 차수에 따라서 자식 노드의 갯수가 정해진다.
> M 각 노드의 자식 노드 갯수
> 각 노드의 자식 키의 최대 갯수를 구하기 위해서는 M-1
> 자식노드의 갯수는 M/2 , then 반올림
> 각 노드의 최소 키의 갯수는 M/2 - 1

## index 구조
```sql 
-- 학생 테이블을 만들고 인덱싱 설정을 해보자
CREATE TABLE student(id INT AUTO_INCREMENT PROMARY KEY, name VARCHAR(20), email VARCHAR(20), age INT, class VARCHAR(20) )
```

### 실습 요구사항
> 저는 항공사 웹페이지를 만들고싶어요
> 사용자의 계정의 정보가 필요하고 사용자는 여권 등록을 할 수 있어요
> 여권등록이 되면 비행기 예약을 할 수 있어요
> 비행기 예약한 후에 음식을 예약할수 있어요 자리도 예약을 할 수 있어요

> 사용자의 정보는 이름과 나이 성별
> 여권은 이름과 성별 여권 번호(8) 유효한 기간
> 비행기 예약에는 정보가 비행기 번호 출발지 도착지
> 음식 예약에는 주문한 사람, 음식이름, 가격
> 비행기 자리 예약은 자리번호 

> 페이지는 마이페이지에 접근하면 
> 사용자 정보가 보이고 비행기 예약 정보에서 비행기 번호 주문한 음식 이름 자리 번호 보이기

> 비행기 예약 조회 페이지 모든 사용자의 정보에 이름이 보이고 출발지 , 도착지 비행기 번호 보이기

> 여권 유효 조회 페이지에서 
> 사용자 이름 나이 성별 여권 번호 유효기간