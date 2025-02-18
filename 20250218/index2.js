// 모듈화된 데이터를 가져오기
// require 외부에서 내보낸 모듈을 가져올 수 있다.
// require('파일의 경로')
// require es5구문
// es5에 생성된 모듈은 모두 require 메서드를 사용한다.
const block = require('./index') //.js (확장자명)은 생략 가능
// const lotto = require('./lotto')
const {lottoNum, result, init, play} = require('./lotto') //객체니까 구조분해 할당 가능
init();
play();
console.log(result);

// 다른파일에서 Index.js에서 내보낸 데이터의 내용이 출력
console.log(block)
// console.log(module.exports)

// console.log(module)

// module.exports === 모듈에서 외부로 내보낼 객체의 내용 

// 모듈 스코프에서 호출될때 this === exports
console.log(this, "나야 모듈");

function a () {
    console.log(this); //> 글로벌을 가르킴 // 전역 객체 참조
}
a();

const b =() => {
    // 화살표 함수는 this바인딩이 안됨
    //this 바인딩이 일어나지 않아서 모듈 스코프의 exports를 가르킨다.
    //b()는 최상위 스코프(모듈 레벨)에서 선언되었으므로, this는 module.exports를 가리킨다.
    console.log(this, "나야 b");
}
b();
