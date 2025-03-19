-- 유저 테이블
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(10) NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(10) NOT NULL
);


-- 여권 테이블 
CREATE TABLE Passport (
    passport_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    passpost_num VARCHAR(8) NOT NULL UNIQUE,
    expiration_period DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
)

-- 비행기 예약 테이블
CREATE TABLE Reservation_plane (
    reservation_id INT PRIMARY KEY AUTO_INCREMENT,
    passport_id INT NOT NULL,
    plane_num VARCHAR(20) NOT NULL,
    departure VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    FOREIGN KEY (passport_id) REFERENCES Passport(passport_id)
)

-- 음식 주문 테이블
CREATE TABLE Food_reservation (
    food_reservation_id INT PRIMARY KEY AUTO_INCREMENT,
    reservation_id INT NOT NULL,
    food_name VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    FOREIGN KEY (reservation_id) REFERENCES Reservation_plane(reservation_id)
)


-- 자리 예약 테이블
CREATE TABLE Seat_reservation (
    seat_reservation_id INT PRIMARY KEY AUTO_INCREMENT,
    reservation_id INT NOT NULL,
    seat_num VARCHAR(10) NOT NULL,
    FOREIGN KEY (reservation_id) REFERENCES Reservation_plane(reservation_id)
)

SELECT * FROM Users;
SELECT * FROM Passport;
SELECT * FROM Reservation_plane;
SELECT * FROM Food_reservation;
SELECT * FROM Seat_reservation;

-- 마이페이지 조회 
-- > 사용자 정보가 보이고 비행기 예약 정보에서 비행기 번호 주문한 음식 이름 자리 번호 보이기
SELECT 
u.name AS "이름", u.age AS '나이', u.gender AS "성별",
fr.plane_num AS "비행기 번호", fr.departure AS "출발지", fr.destination AS "도착지",
fo.food_name AS "주문한 음식",
se.seat_num AS "좌석 번호"
