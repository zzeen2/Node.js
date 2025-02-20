// 요청을 받은 메세지를 객체로 변환

// 많이 사용할거는 상수로 정의해두자
const SPACE = " "; // 빈공백
const NEW_LINE = "\r\n" // 한줄 내린것
const TWO_LINE = NEW_LINE + NEW_LINE; // 바디내용 식별하기 위해
const START_LINE_NAMES = ["method", "url", "version"]; // 요청메세지의 첫번째 라인 키 정해주기

// 쿼리 문자열 파싱----------------------------------------------
const getQuery = (queryString) => {
    if(queryString.length === 0) return null;
    // index=1&age=2 << 여러개 들어오는거 구별해줘야함
    const query = queryString.split("&")
    // [index=1, age=2]
    const query2 = query.map((value)=> value.split("="))
    //[index, 1], [age, 2]]
    const query3 = query2.reduce((acc, line)=> {
        const [key, value] = line;
        acc[key] = value;
        return acc;
    },{})
    // {index : 1, age : 2}
    return query3;
}

// 요청 데이터의 시작 라인 추출 할 함수 ---------------------------------------
const getStartLine = (startLineString) => {
    // GET /shop HTTP/1.1
    //[GET, /shop, HTTP/1.1]
    const startLine1 = startLineString.split(SPACE);
    const startLine2 = startLine1.map((value, index)=> [START_LINE_NAMES[index], value]) //새로운 배열을 만들어서 반환
    // [["method", "GET"], ["url", "/shop"], ["version", "HTTP/1.1" ]] >> map 함수 호출했을때 결과
    // 객체로 변환  
    const startLine3 = startLine2.reduce((acc, line, index) => { // 이전의 값(초기값), 순회중인 요소, 인덱스 
        const [key, value] = line;
        acc[key] = value
        return acc;
    }, {})  
    // //console.log(startLine3);
    // {"method": "GET" , "url": "/shop" ,  "version": "HTTP/1.1" }
    // {"method": "GET" , "url": "/shop?index=1" ,  "version": "HTTP/1.1" }
    // 쿼리스트링이 있는 경우
    // 쿼리스트링이 포함되어있는지 여부 판단하고 키로 추가해주면 된다.
    const querystringEndIndex = startLine3.url.indexOf("?");
    // console.log(querystringEndIndex)
    // 쿼리스트링이 있으면
    const isQuery = querystringEndIndex !== -1;
    if(isQuery) {
        //쿼리 문자열을 객체로 변환
        const queryString = startLine3.url.slice(querystringEndIndex + 1);
        // index=1
        // 쿼리 문자열 처리
        const query = getQuery(queryString);
        startLine3.query = query;
        startLine3.url = startLine3.url.slice(0, querystringEndIndex)
    }
    return  startLine3
    // //console.log(startLine3);
}   



// const a = [1,2,3,4,5,6];
// a.reduce((acc, value, index)=> {
// //     console.log(acc)
// //     console.log(value, ":", index);
//     acc[value] = index;
//     return acc;
// }, {})
// 두번째 매개변수가 있고 없고의 차이가 있는데, 배열의 요소의 첫번째를 할당하고 두번째 요소부터 순회
// 값이 있으면 초기값으로 두번째 매개변수를 할당하고 첫번째 요소부터 진행
// 첫번째 매개변수에 이전 값을 전달하기 위해서는 콜백함수에서 반환한 값으로 재할당 된다.

//-------------------------------------------------------------------------------------
// 헤더의 정보를 만들 함수
const getHeaders= (headerString) => {
    const headerLine = headerString.split(NEW_LINE); //> 한줄마다 잘라서 배열에 추가
    // 스타트라인 따로 빼놓기
    const startLineString = headerLine.shift();
    // shift
    // 배열에서 첫번째 인덱스를 내보낸다.
    // 주소에 있는 원본 배열 수정하고 반환값은 원본에서 제거되는 첫번째 요소의 값
    // //console.log(headerLine);
    const startLine = getStartLine(startLineString);
    // console.log(headerLine)
     
    // 헤더의 나머지 값을 객체로 변환
    const headers = headerLine.reduce((acc, line)=>{
        const [key,value] = line.split(": "); // 'Sec-Fetch-Mode: navigate' >> ['Sec-Fetch-Mode' , 'navigate']
        acc[key] = value;
        return acc;
    },{})
    // console.log(headers);

    // 여러개의 값을 내보내는 경우 참조타입으로 내보내는것이 좋음
    return {
        startLine, headers
    }
    /**
     * {startLine: startLine , headers: headers} === {startLine , headers}
     */
}

//body 영역 잘라주기 위해
const getHeaderEndIndex = (request) => request.indexOf(TWO_LINE);


// 최종적으로 데이터의 파싱을 하는 함수------------------------------------------
// 나눠져서 
const getRequest = (buffer) => {
    const headerEndIndex = getHeaderEndIndex(buffer)
    const ifHeaderPendding = headerEndIndex === -1; // 헤더의 정보가 없으면
    // 요청 메세지가 전부 전송이 되었는지 확인
    if (ifHeaderPendding) return null;
    
    //const a = [1,2,3];
    //const [b, ...c] =a;
    const [headerString, ...bodyString] = buffer.toString().split(TWO_LINE);
    const body = bodyString.join(TWO_LINE); // 바디 내용을 하나의 문자열로 변환
    const header = getHeaders(headerString);
    return{
        header, body
    }
}

// {request : { getHeaders }}
exports.request = { getRequest }