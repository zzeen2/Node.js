const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send("dd")
    });

app.listen(port, () => {
    console.log('server on~')
});

/**
 app.use() 함수는 Express 앱에서 항상 실행하는 미들웨어의 역할을 합니다. app.get(), app.post() 등과 달리 요청 URL을 지정하지 않아도 app.use()를 사용할 수 있으며, 해당 경우에는 URL에 상관없이 앱이 요청을 수신할 때마다 매번 실행됩니다.

 # app.use() 기본 문법
app.use(path, callback)
 · path: 미들웨어 함수가 호출되는 경로입니다. 경로, 경로패턴 또는 경로와 일치하는 정규식 패턴을 나타내는 문자열일 수 있습니다.
 · callback: 미들웨어 함수 또는 미들웨어 함수의 시리즈/배열입니다.

# 모든 요청에 대한 핸들링 : 경로(path)를 지정하지 않는 경우 모든 요청에 대한 공통 핸들링을 지정할 수 있습니다.
app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

# 특정 요청에 대한 핸들링
app.use('/admin/:id', function(req, res, next) {
  // 관리자 권한 체크
  next();
}
 
 */