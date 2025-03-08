// 함수 선언문

function foo () {
    console.log("function declaration")
}

foo();

// 함수표현식

const foo = function(){
    console.log("function expression")
}

// 화살표 함수 
const foo = () => {
    console.log("arrow function")
}

/**
 * 함수 선언문은 호이스팅된다. 어디서든 호출가능하다
 * 함수 표현식은 변수에 할당하여 사용 가능하다.
 * 화살표 함수는 문법이 간결하고, this바인딩이 안된다.
 */