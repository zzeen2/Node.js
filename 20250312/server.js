const crypto = require('crypto');
const upw = "admin123";

// 해시화 : 알고리즘을 통해서 데이터의 고정된 크기의 고유한 값으로 바꿔주는 행위. 16진수의 값으로 변환 고정된 크기의 문자열.

// 알고리즘은 sha256 알고리즘 사용
// 데이터를 256 비트의 고정 크기 값으로 변환해주는 알고리즘
// 원본데이터의 길이의 상관 없이 고정된 크기의 해시 값으로 변경을 해준다.

// createHash 메서드의 매개변수로 사용할 해시 함수 알고리즘 이름
const hash = crypto.createHash("sha256");
// hash 반환된 객체의 메서드를 사용해서 문자열 해시화
// update : 문자열을 해시화
const hashing = hash.update(upw);

//console.log(hashing);
/*
    Hash {
    _options: undefined,
    [Symbol(kHandle)]: Hash {},
    [Symbol(kState)]: { [Symbol(kFinalized)]: false }
    }
 */

// digest 해시 문자열 반환 
// 64 자리(고정)의 크기의 문자열 16진수로 표현된
const hashString = hashing.digest('hex');

//console.log(hashString); //240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9

// 솔트의 값을 사용해서 예측이 불가능한 데이터를 만들어 줘야 한다.

// Salt 사용해서 난수 생성
// 난수 : 랜덤한 값을 생성하는것

crypto.randomBytes(32, (err, result)=> {
    if(err) {
        //console.log(err);
        
    }else{
        //console.log(result); 
        //<Buffer 7d 3c de 9f b7 f4 ac 3b e3 97 32 b9 5f e3 65 a0 c8 6b 93 4b 07 6b f3 8f 2f d2 c6 f5 c8 4c 8d 95>
        //console.log(result.toString('hex')); 
        // 5c9b27618ecfd9b4a39acc78291c3056c8fc396a1eee5731381e82d9efd4b042
        // 콘솔을 찍을때마다 랜덤한 값이 출력된다.
    }
})

// 이 값을 솔트값으로 만든다면 ?
// 예측할수없는 값을 만들 수 있다. 
// 솔트는 안전하게 데이터베이스에 저장
// 모든 비밀번호가 고유한 솔트를 가지고 있다.

// salt값도 노출이 되기 힘들게 만들어야 한다.
// salt값을 찾기 위해서 많은 시도를 한다.

//해커를 귀찮게 하는 방법

// 키 스트레칭 기법
// 해시 함수를 여러번 호출해서 시간을 일부로 오래걸리게 만드는 기법

const createSalt = () => {
    // 난수가 생성이 된다면 콜백함수를 호출하면서 매개변수로 전달
    // new Promise 객체가 최초에 생성되면 pending 대기상태
    return new Promise((res, rej) => {
        crypto.randomBytes(32, (err,result)=> {
            if (err) return rej(err);
            res (result.toString('hex'));
        })
    })
}

//console.log(createSalt()); //Promise { <pending> }

const createHash = (upw, salt) => {
    // 매개변수: 비밀번호, 솔트값, 키 스트레칭 횟수, 바이트, 사용하는 해시 알고리즘, 콜백함수
    const data= crypto.pbkdf2Sync(
        upw,
        salt,
        100000, // 해시 연산을 몇번 반복할지
        32,
        "sha256",
    )
    return data.toString('hex')
}

// 값을 비밀번호 저장해서 사용하는게 솔트와 키 스트레칭 기법을 사용한 해시 문자열을 저장해서 비밀번호로 사용


// const foo = async() => {
//     const data = await createSalt() //createSalt()가 다 실행될때까지 기다리고, 그 다음
//     console.log(data);// 데이터를 찍음
//     createHash(data);
// }

// foo();

// 실전
// express mysql2 ejs

const express = require("express");
const { connect } = require('http2');
const mysql = require("mysql2/promise");
require("dotenv").config(); // express i dotenv
const app = express();
const path = require("path")
app.set("view engine", "ejs");
app.use(express.json());
app.use("/public" ,express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:false}));

// createConnection : 요청 쿼리를 테스트 하는 객체를 만드는 메서드
// createPool : 다수의 유저가 쿼리를 요청해도 풀을 생성해서 속도가 유지되게 최적화를 시킨것.

// 환경변수 생성을 한 뒤에
// dotenv라이브러리에서 .env의 값을 읽어서 안에있는 내용을 문자열로 잘라서
// 환경변수의 이름과 값을 프로세스가 종료되면 환경변수에서 제거된다.

// 값을 가져와서 사용
// process: os의 내용이 포함된 객체
// env이 키의 값으로 들어있다 환경변수
//console.log(process.env.DATABASE_USER);
const connectPool = mysql.createPool({
    // user : "",
    user : process.env.DATABASE_USER,
    //password: "",
    password: process.env.DATABASE_PASSWORD,
    database : "project",
    multipleStatements : true,
    host : "localhost",
    // host : DATABASE_HOST,
    port : 3306
    //port : DATABASE_PORT
})

// 커넥션 확인
connectPool.getConnection (()=> {
    console.log(err);
})

// 테이블이 없으면 생성, 있으면 그냥 유지
// 테이블 초기화
const userTableInit = async() => {
    try {
        console.log("테이블 확인")
        // 비동기 처리 로직 promise로 실행하지 않으면 에러 핸들러가 발생하지 않음
        await connectPool.query("SELECT * FROM users");
    } catch (err) {
        console.log("테이블 없어서 생성")
        connectPool.query("CREATE TABLE users(id INT AUTO_INCREMENT PRIMARY KEY, uid VARCHAR(10), upw VARCHAR(128), salt VARCHAR(128))")
    }
}
userTableInit();

// 메인페이지
app.get('/', (req,res)=> {
    res.render('main')
})

// 회원가입 페이지
app.get('/signup', (req,res)=> {
    res.render("signup")
})
// 로그인페이지
app.get('/login', (req,res)=> {
    res.render("login")
})

app.post('/signup', async(req,res) => {
    try {
        const {uid, upw} = req.body;
        console.log(uid, upw)
        const salt = await createSalt(); // 비밀번호 암호화를 위해서
        console.log(salt)
        const pwHash = createHash(upw, salt);
        console.log(pwHash)
        const [[data]] = await connectPool.query("SELECT * FROM users WHERE uid =?", [uid]);
        console.log(data)
        console.log("123")
        if(data) return res.json({state:400, message:"회원가입 실패"})
        
        await connectPool.query("INSERT INTO users (uid, upw, salt) VALUES (?,?,?)",[uid,pwHash,salt])
        res.json({state: 200, message : "회원가입 완료"});
    } catch (error) {
        console.log(error)
        res.json({state : 500, message: "서버 에러"})
    }
})

app.post ("/login", async(req,res) => {
    try {
        const {uid, upw} = req.body;
        const [[data]] = await connectPool.query("SELECT * FROM users WHERE uid =?", [uid]);
        if(!data) return res.json({state : 401, message : " 아이디가 존재하지 않아요"})
        // 비밀번호 검사
        const pwHash = createHash(upw, data.salt);
        if(pwHash === data.upw){
            // 응답 메세지를 만드는 객체
            // 헤더에 쿠키의 추가 내용을 작성
            // set-cookie
            // JWT
            // 호스트가 같아서 지금은 되는데 호스트가 다를경우 크리덴셜 속성을 호스트가 다르고 자바스크립트 즉 axios 요청을 보내는 경우 //> cors에러가 발생.
            res.cookie("login-token", data.uid, {
                maxAge : 10 * 60 * 60 * 1000,
                httpOnly : true // 요청과 응답간의 사용할 수 있는 쿠키 데이터, 자바스크립트에서 접근 불가능하다.
            })
            res.json({state : 200, message : "로그인 성공"})
        }else{
            res.json({state : 402, message : "비밀호가 틀렸습니다."})
        }
        
    } catch (error) {
        res.json({state : 500, message : error})
    }
})

const loginCookieParser = (req,res, next) => {
    if (!req.headers.cookie) return res.redirect('/login');
    console.log(req.headers.cookie)
    const cookie = req.headers.cookie.split("=")[1];
    req.cookie = cookie;
    next();
}
app.get('/main', (req,res)=> {
    res.render('main');
})
app.get('/mypage', loginCookieParser, (req,res) => {
    // 로그인이 되어있을때만 보여줄 페이지
    res.render('mypage', {username : req.cookie});
})

app.listen (3000,()=> {
    console.log("server on");   
})