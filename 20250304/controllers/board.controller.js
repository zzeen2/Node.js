// 데이터를 제어하는 기능 로직

const { create, select, selectAll } = require("../models/board");

// create
const createBoard = (req) => {
    // console.log(req.body);
    // console.log(req.file);
    const {title, content} = req.body;
    const {filename} = req.file;

    const imgName = "http://localhost:3000/image/" + filename; // 나중에 src에 들어갈거임

    create(title, content, imgName);
    //console.log(selectAll())
}

//read - 전체 목록 보여주는 페이지
const selectBoardAll = ()=>{
    return selectAll();
}

// read - 상세페이지
const selectBoardIndex =(index)=> {
    return select(index);
}
module.exports = {createBoard, selectBoardAll, selectBoardIndex} //createBoard가 키 이름