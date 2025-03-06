const fs = require("fs")
let data =[];

// 데이터 추가
const create = (title, content, imgPath, filename)=> {
    data.push({title, content, imgPath, filename});
}

// 데이터 조회
const select = (index)=> {
    return data[index];
}

// 전체 데이터 조회
const selectAll =()=> {
    return data
}

// 데이터 수정
const edit =(index, title, content, imgPath)=> {
    data[index].title = title;
    data[index].content = content;
    data[index].imgPath = imgPath;
}

const contentDelete = (index)=> {
    fileName = data[index].filename
    fs.rm("./upload/" + fileName, (err)=> {
        if (err){
            console.log("에러발생")
        }else{
            "삭제완료"
        }
    });
    console.log(fileName)
    data.splice(index,1);
    console.log(data)
}
module.exports = { create, select, selectAll, edit, contentDelete };

// 데이터 삭제