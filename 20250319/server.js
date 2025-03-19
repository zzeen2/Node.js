const fs = require("fs");
const { faker } = require("@faker-js/faker");

// csv 파일 스트림 생성
const file = fs.createWriteStream("student.csv");

// 사용할 테이블의 컬럼 내용
file.write("id,name,email,age,class\n"); // 첫 줄은 필드명으로 작성

const classArr = ["blockchain", "game", "story"];

// 이후의 랜덤 데이터 생성
for (let i = 0; i < 1000000; i++) {
    const id = i;
    const name = faker.internet.userName(); // username() → userName() (올바른 함수명)
    const email = faker.internet.email();
    const age = Math.floor(Math.random() * 100) + 1;
    const className = classArr[Math.floor(Math.random() * 3)];

    // file.write()에 하나의 문자열로 전달
    file.write(`${id},${name},${email},${age},${className}\n`);
}

// 스트림 종료
file.end();
