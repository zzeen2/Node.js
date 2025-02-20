// nodejs의 내장 모듈
// stream

// Transform 스트림 데이터를 읽고 데이터를 변환한 뒤 다른 스트림으로 데이터를 전달 하는데 사용
// 
const {Transform} = require("stream");

// nodejs의 내장 모듈을 사용해서 
// 파일을 읽거나 쓰거나
// 파일 시스템 모듈을 사용해서 파일의 CRUD를 제어할 수 있다.
const fs = require('fs');

// 청크의 크기
// 스트림에서 작업할때 데이터를 받고 처리할때마다 각 청크의 크기를 정해주자
const chunkSize = 64 * 1024 // 64KB

// Transform 생성자 함수 호출할때 필요한 옵션의 값을 가지고있는 객체
const transferDate = new Transform({
    highWaterMark : chunkSize, //highWaterMark 키에는 청크의 크기의 값을 전달
    transform(chunk, en, callback){
        // chunk 단위의 데이터를 받는것
        //toUpperCase 대문자로 변환
        this.push(chunk.toString().toUpperCase());
        // 변환이 완료가 되면 콜백함수 호출
        callback();
    }
})
// 파일을 text.txt 하나 만드고 파일에 있는 내용을 text2.txt 새로운 파일에 내용을 추가

//createReadStream 스트림데이터를 읽어온다
// 매개변수 첫번째 파일의 경로
// 매개변수 두번째 옵션값을 객체로 저장
// 파일을 읽어오기 > 스트림 데이터를 읽어온다.

const text = fs.createReadStream('text.txt', {highWaterMark: chunkSize});
console.log(text);

// 파일 읽기 스트림 생성

// text2 파일의 내용에 스트림 데이터를 추가
// 파일에 스트림 데이터 추가
const text2 = fs.createWriteStream('text2.txt')

// 스트림으로 내용을 파일에서 읽어서 다른 파일의 내용으로 추가
// pipe : 메서드를 호출하는 객체의 데이터의 내용을 매개변수로 전달한 스트림 객체에 내용을 이동시킨다.
text.pipe(transferDate).pipe(text2);