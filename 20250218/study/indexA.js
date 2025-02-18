// ### 모듈 A 모듈 B, 모듈 C 이렇게 세가지의 모듈을 가지고
// > a의 모듈에 b의 모듈을 가져오고, b의 모듈에 c의 모듈을 가져올 것,
// > c의 모듈에는 name이라는 변수를 내보내고
// > b의 모듈에는 age라는 변수를 내보내고,
// > a의 모듈에서는 name과 age를 출력

// let name = require('./indexB')
// let age = require('./indexB')

let nameAndAge = require('./indexB');
console.log(nameAndAge);
//console.log(name, age);

