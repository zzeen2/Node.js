//const { upload } = require("upload");
const multer = require("multer");
const path = require("path"); //내장모듈

// 미들웨어를 만드는 매서드를 포함하는 객체 내보내기
//const storage = multer.diskStorage({저장소위치, 파일의 이름}); 얘처럼 변수 할당 하지 않고, 바로 객체에 넣어서 전달
exports.upload = multer( {storage : multer.diskStorage(
    {
        destination : (req,file, cb) => {
            //console.log(file);
            cb(null, "upload"); // 오류내용, 파일을 저장할 공간
        },
        filename : (req,file,cb)=> {
            // path 모듈 사용해서 확장자명, 확장자 이외의 이름 잘라내기
            const ext = path.extname(file.originalname); // 확장자 부분
            const baseName = path.basename(file.originalname, ext) + "_" + Date.now(); 
            //path.basename(file.originalname, ext)  확장자가 없는 파일의 이름추출
            cb(null, baseName + ext);
        }
    }),
    // 파일의 사이즈를 얼마나 설정할지 크기제한
    // 5MB
    limit : {filesize : 5 * 1024 * 1024 }
});

//내보내면서 키값 추가 {upload : 값}

/*
 upload : {
    storage : {diskStorage : {destination: f{}, filename : f()}},
    limit : {}
    }
 */