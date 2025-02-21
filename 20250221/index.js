const fs = require('fs');

//비동기적으로 실행할수있는 메서드
fs.exists("./Test", (e)=> {
    console.log(e);
})

// 동기적으로 코드를 호출할수있는 메서드
let folder = fs.existsSync("./Test",)

console.log(folder)
console.log("실행 1")

// // 비동기적 호출
// if (!folder) {
//     fs.mkdir("./Test", (err) => {
//         if(err){
//             console.log(new Error (err))
//         }else {
//             console.log("폴더 생성 완료")
//         }
//     })
// }

// 동기적 호출
if (!folder){
    const text = fs.mkdirSync("./Test");
    console.log(text);
    condole.log("실행 2")
}

// 폴더안에 파일을 추가
const str = `
    안녕하세요
    저는
    지은입니다  234.
`
// fs.writeFile("./Test/text.txt", str, (err)=> {
//     if (err){
//         console.log(err);
//     }else{
//         console.log("파일 생성 완료");
//     }
// } );

const text2 = fs.writeFileSync("./Test/text.txt", str);

console.log(text2);
console.log("실헹 3번")

// 파일 읽어오기 (비동기)
// fs.readFile("./Test/text.txt", "utf8", (err, data) => {
//     if(err){
//         console.log(err);
//     }else {
//         console.log(data);
//     }
// })

const text3 = fs.readFileSync("./Test/text.txt", "utf8")
console.log(text3);
console.log("실행4")

//{recursive : true} : 삭제 할때 옵션으로 내부에 있는 파일까지 삭제를 허용하겠다.
fs.rm("./Test", {recursive : true}, (err)=> {
    if (err){
        console.log(err)
    }else {
        console.log("삭제 완")
    }
})
