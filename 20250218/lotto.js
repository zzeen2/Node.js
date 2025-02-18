// 모듈화의 장점 유지보수가 좋다.
const lottoNum = [];
const result = [];

const init = () => {
    for (let i = 1; i <= 45; i++) {
        lottoNum.push(i)
        
    }
}

const play =() => {
    for (let i = 0; i < 6; i++) {
        const random = Math.floor(Math.random() * lottoNum.length);
        result.push(lottoNum[random]); //> lottoNum[random] : 배열의 i 번째 요소
        lottoNum.splice(random, 1); //> 중복 제거
    }
}

// play();
// console.log(result);

module.exports = {lottoNum, result, init, play };
// module.exports.lottoNum = lottoNum