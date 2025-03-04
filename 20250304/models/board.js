// 임시 db
let board = [];

// 데이터의 조작

// 데이터 추가
const create = (title, content, imgPath) => {
    board.push({title, content, imgPath});
    return "게시글 추가 완료 ="
}

// 데이터 인덱스 조회
const select = (index) => {
    return board[index];
}

// 전체 데이터 조회
const selectAll =()=> {
    return board;
}

module.exports = { create, select, selectAll };