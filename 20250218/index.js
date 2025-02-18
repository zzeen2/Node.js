const blockClass = [
    {
        name : "soon",
        age : 20,
        comment(){ //메서드 축약형 // function을 사용하면 불필요한 생성자의 내용까지 포함되기 때문에 
            console.log("hello")
        }
    },
    {
        name : "kim",
        age: 30,
        comment() {
            console.log(`안녕 ${this.name} 이야`)
        }
    }
]
// index.js에서 내보낼 데이터
module.exports = blockClass;
// module.exports에 값을 할당하면 더이상 global이 아닌 exports에 포함된 객체가 this로 호출된다. *********

console.log(this)

/**
 * node index.js를 출력했을때 빈객체가 출력되는 이유
 * 1. nodejs에서 최상위 this의 동작
 * - nodejs 환경에서 this는 브라우저의 전역객체(window)와 다르게 작동한다.
 * - 일반적으로 전역 스코프에서 this는 module.exports를 가리키지 않고, 빈객체를 참조한다.
 * 2. 실제 this가 가리키는 것
 * - console.log(this)는 index.js의 최상위에서 실행되는데, node.js의 각 파일은 자체 적인 모듈 (module.exports)로 감싸져 있기 때문에 여기서 this는 module.exports와 다르게 동작한다. 
 * - Node.js에서 모듈 시스템으로 인해 각 파일은 개별적인 스코프를 가지므로, 최상위에서 this를 출력하면 {} 빈 객체가 나온다.
 * 
 * 
 * 실험
 * console.log(globalThis); // Node.js의 전역 객체 출력
console.log(module.exports === this); // false (module.exports는 빈 객체 `{}`이지만, this는 다르게 동작)
console.log(module.exports); // 내보낼 객체 (blockClass가 할당됨)

 */