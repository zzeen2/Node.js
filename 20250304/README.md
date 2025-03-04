# 파일 업로드 Multer(라이브러리)

> express 환경에서 파일의 업로드를 처리하는 미들웨어를 제공
> 파일을 업로드해서 미들웨어에서 메모리에 파일을 저장하는 기능 

## 웹에서 파일을 업로드 
> form요소로 파일을 업로드를 했고 데이터를 효과적으로 관리하기 위해 multipart/formatData 방식을 사용하게 되었다.

> 파일 업로드를 할 때 content-type이 multipart/formatData인지 확인해서 파일을 처리한다.

> 업로드한 파일의 파싱 내용도 요청 객체에 생성한다.

## 구조
>  multipart/formatDate 형식의 데이터를 처리하기 위해서 스트림을 사용한다.
> 우리가 원하는 작업 폴더에 파일을 저장한다.

> 스토리지 옵션 : 파일을 저장할 위치와 방법을 설정할 수 있는 옵션이 제공
> 파일 필터링 : 업로드되는 파일을 필터링해서 확장자 등의 조건에 맞는 파일만 처리할 수 있는 옵션 제공
> 파일 크기 제한 : 파일의 크기를 제한할 수 있다.

> 핸들러 함수를 만들어서 사용한다. 

### mime 타입 (multipurpose internet mail extentsions)
> 컨텐츠를 전달할때 사용하는 파일의 종류를 요청 메세지에서 알려준다.
> content - type : text/html
> content - type : image/png
> content - type : application/json
> content - type : multipart/form-data
> content - type : application/actet-stream

> multipart/form-data >> 바이너리 데이터를 전달할 수도 있고, 여러가지 데이터도 같이 전달 가능하다.
> 파일과 텍스트를 같은 요청에 포함해서 보낼 수 있다.
```sh
npm i multer
```
```js
const express = require("express");
const multer = require("multer");
const path = require("path")

const app = express();

// 저장소의 설정을 설정하기 위한 객체
// multer 라이브러리를 사용할때 필요한 형식의 객체를 생성해주는 메서드
const storage = multer.diskStorage({
    destinaion : (req, file, cb) => {
        // 다음 미들웨어로 넘기는 함수 콜백함수 전달이 되어있다.
        // 첫번째 매개변수는 오류의 내용이 있으면
        // 두번째 매개변수는 저장 위치
        cb(null, 'uploads');
    },
    filename : (req, file, cb) => {
        // req 요청 객체
        // file 파일의 내용을 가지고있는 객체 
        // cb 다음 미들웨어 호출 콜백
        // file키에 저장할 이름의 형식을 전달해준다.
        // 파일이 저장될때 이름
        // file.fieldname 파일의 이름
        // now() 현재 시간을 반환하는 메서드
        // 안녕_2025/03/04/10/07 이름에 시간을 포함시켜서(중복되서 저장되는 것의 경로 꼬임을 막기 위해 )
        // 혹은 고유의 키값도 포함시키는 경우가 있다.

        //<img src = "img/안녕.png">
        // 원본파일 이름에서 확장자명만 잘라오자.
        // path.extname : 경로 문자열에서 확장자만 추출하는 메서드
        // originalname 확장자가 포함되어있는 파일명(내장)
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))

    }
}) //객체의 내용을 반환

// 객체를 사용해서 미들웨어 함수를 만들 객체 생성
// 설정한 옵션을 포함하고 있는 multer객체 생성해서 전달
// multer 객체의 안에는 메서드가 포함되어있는데
// 우리가 미들웨어로 사용할 핸들러 함수를 반환할 메서드가 포함되어있다. 
const upload = multer({ storage });
// uploade.single("키") ==> () => {} 핸들러 함수 반환
 
// 이미지 혹은 파일 업로드 하기 위한 요청처리
// app.post("/upload", (req,res, next)=> {
//     next();
// })
// app.post("/upload", upload.single(""))
// 위에 두개는 같은 내용이고, 위 두개를 아래처럼 합칠수잇음
app.post("/upload", upload.single("img"), (req,res)=> {
    res.send("안녕");
})
// 요청의 메세지에서 데이터 타입을 검사하고 파일을 스트림으로 읽어서 파일을 원하는 경로에 저장한다.

// single 하나의 파일을 업로드
// upload.array 파일을 여러개 업로드 할때
// upload.array("key", 10) 첫번째 매개변수가 키 두번째 매개변수가 갯수
app.listen(3000, (req,res)=> {
    console.log("server on !")
})
```

## 이미지 저장하고 화면에 출력

화면에 게시글 출력

### MVC 패턴으로 작성

> models : 데이터의 조작(조회와 저장)
> views : 사용자의 화면 ui 구성
> controllers : 사용자의 기능을 구성 로직작성 사용자가 컨트롤 할 수 있는 내용 기능들 