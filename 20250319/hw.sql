-- Users 테이블 생성
CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(10) NOT NULL
);

-- Passports 테이블 생성
CREATE TABLE Passports (
    passport_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    passport_number VARCHAR(8) NOT NULL UNIQUE,
    valid_until DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- FlightReservations 테이블 생성
CREATE TABLE FlightReservations (
    reservation_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    flight_number VARCHAR(20) NOT NULL,
    departure VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    departure_time DATETIME NOT NULL,
    arrival_time DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- FoodOrders 테이블 생성
CREATE TABLE FoodOrders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    reservation_id INT NOT NULL,
    food_name VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    FOREIGN KEY (reservation_id) REFERENCES FlightReservations(reservation_id)
);

-- SeatReservations 테이블 생성
CREATE TABLE SeatReservations (
    seat_reservation_id INT PRIMARY KEY AUTO_INCREMENT,
    reservation_id INT NOT NULL,
    seat_number VARCHAR(10) NOT NULL,
    FOREIGN KEY (reservation_id) REFERENCES FlightReservations(reservation_id)
);

-- 마이페이지 조회 쿼리
SELECT 
    u.name AS '사용자 이름',
    u.age AS '나이',
    u.gender AS '성별',
    fr.flight_number AS '비행기 번호',
    fr.departure AS '출발지',
    fr.destination AS '도착지',
    fo.food_name AS '주문 음식',
    sr.seat_number AS '좌석 번호'
FROM 
    Users u
LEFT JOIN 
    FlightReservations fr ON u.user_id = fr.user_id
LEFT JOIN 
    FoodOrders fo ON fr.reservation_id = fo.reservation_id
LEFT JOIN 
    SeatReservations sr ON fr.reservation_id = sr.reservation_id
WHERE 
    u.user_id = [사용자ID];

-- 비행기 예약 조회 페이지 쿼리
SELECT 
    u.name AS '사용자 이름',
    fr.departure AS '출발지',
    fr.destination AS '도착지',
    fr.flight_number AS '비행기 번호',
    fr.departure_time AS '출발 시간',
    fr.arrival_time AS '도착 시간'
FROM 
    FlightReservations fr
JOIN 
    Users u ON fr.user_id = u.user_id
ORDER BY 
    fr.departure_time;

-- 여권 유효 조회페이지 쿼리
SELECT 
    u.name AS '사용자 이름',
    u.age AS '나이',
    u.gender AS '성별',
    p.passport_number AS '여권 번호',
    p.valid_until AS '유효기간',
    CASE 
        WHEN p.valid_until < CURDATE() THEN '만료됨'
        WHEN p.valid_until BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 6 MONTH) THEN '곧 만료'
        ELSE '유효함'
    END AS '상태'
FROM 
    Users u
LEFT JOIN 
    Passports p ON u.user_id = p.user_id
ORDER BY 
    p.valid_until;

-- 