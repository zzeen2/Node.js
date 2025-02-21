
# fs 대용량 영상 처리 

### fs 파일 시스템 모듈(내장 모듈)
> 파일을 읽거나 쓰거나 삭제 생성 등을 할때 사용하는 내장 모듈

### 문법
```js
// 내장 모듈을 가져오기
const fs = require("fs")

// 모듈 안에 내장되어있는 메서드를 활용해서 파일을 제어할 수 있다.

// 폴더가 있는지 확인
const fs = require('fs');

//비동기적으로 실행할수있는 메서드
fs.exists("./Test", (e)=> {
    console.log(e);
})

// 동기적으로 코드를 호출할수있는 메서드
let folder = fs.existsSync("./Test",)

console.log(folder)
console.log("실행 1")

// 폴더가 없으면 생성
if (!folder) {
    fs.mkdir("./Test", (err) => {
        if(err){
            console.log(new Error (err))
        }else {
            console.log("폴더 생성 완료")
        }
    })
}

const text = fs.mkdirSync("./Test");
console.log(text);
condole.log("실행 2")

// 폴더안에 파일을 추가
// 수정과 추가가 같음
const str = `
    안녕하세요
    저는
    지은입니다.
`
fs.writeFile("./Test/text.txt", str, (err)=> {
    if (err){
        console.log(err);
    }else{
        console.log("파일 생성 완료");
    }
} );


const text2 = fs.writeFileSync("./Test/text.txt", str);

console.log(text2);
console.log("실헹 3번")

// 파일을 만드는 이유는> 데이터를 저장하고 불러오기 위해서
// 파일 읽어오기
fs.readFile("./Test/text/txt", "utf8", (err, data) => {
    if(err){
        console.log(err);
    }else {
        console.log(data);
    }
})

// 삭제
fs.rm("./Test", ()=> {
    if (err){
        console.log(err)
    }else {
        console.log("삭제 완")
    }
})

```

## 대용량 영상

### 

