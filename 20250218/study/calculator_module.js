// let a = 3
// let b = 3


function add(a,b) {
    const add = a + b;
    return add
}

function abb(a,b) {
    const abb = a - b;
    return abb
}

module.exports= { add, abb }
//console.log(module.exports); //> { add: [Function: add], abb: [Function: abb] }
//console.log(add(a,b));//> 6