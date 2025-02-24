// 서버에 정적 파일 폴더에 있는 모든 파일을 순회하면서 파일 검사.

const fs = require("fs");
const path = require("path");

// Public 루트경로
const rootName = "public";
const rootDir = path.join(__dirname, "..", rootName) // 현재 작업하는 파일이 있는 폴더까지

// 경로들을 담을것
const result = {};

// 재귀함수 *** 모든 폴더 및 내부 폴더 및 파일의 경로를 호출
const find = (currentPath = rootDir) => {
    // 경로의 파일과 디렉터리 목록을 읽기
    // 폴더인지 확인
    // readdirSync : 파일과 디렉터리 목록을 가져올수있다.
    // 반환 파입은 배열, 여러개가 될 수 있기 떄문에
    const directory = fs.readdirSync(currentPath);
    //console.log(directory)

    // public/css
    // public/js
    // public/css/main
    // public/css/mypage
    // public/css/shop
    for (const index in directory) {
        const findPath = path.join(currentPath, directory[index]);
        //console.log(findPath)
        // 파일인지 폴더인지
        // statSync : 파일의 내용을 객체로 받을 수 있는 메서드
        // isFile : 파일이면 true, 디렉터리 false
        const isFile = fs.statSync(findPath).isFile();
        //console.log(isFile);
        // 디렉터리면
        if(!isFile) {
            // public/css
            // public/js
            // 모든 폴더나 모든 파일의 경로를 모두 호출. 재귀함수 사용해서
            find(findPath);
        } else { // 파일일 경우에는
                // 여기에 실행할 코드 내용을 작성
                // 파일이 있는 애들만 가져오기
            const key = currentPath === rootDir ? "/" : currentPath.replaceAll(rootDir, "");
            //console.log(key);
            // 파일의 /로 시작하는 폴더 경로 까지를 만들고

            const httpPath = path.join(key, directory[index]).replaceAll("\\", "/")
            //console.log(httpPath);
            // 모든 파일의 경로를 완성
            result[httpPath] = directory[index];
        }
    }
    return result;
}
//const log = find();
// 요청 url이 /css/main/main.css 면 main.css 사용하려고
//console.log(log)
module.exports = find(rootDir);