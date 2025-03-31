# 웹소켓

## 소켓
> 소켓은 인터넷상에서 즉 네트워크에서 통신하는 역할을 도와주는 개념
> 데이터를 받는 역할
> ip주소, 포트번호 연결을 시도한다. 데이터를 받을 수 있다.
> 소켓은 컴퓨터에서 데이터를 주고받을때 연결 속성을 가지고 있다.
> ip주소와 포트번호를 가지고 데이터를 받을 수 있다.

## http와 websoket의 차이
> 프로토콜의 차이

1. http : 요청 후 응답. 요청 후 응답하고 안전하게 종료하는 속성
        http://, https://
2. websoket(ws) : 요청을 한쪽에서만 지향하는것이 아니고, 양방향 통신을 지향한다. 논리적 연결을 유지해서 실시간으로 데이터를 주고받을 수 있다.  
                ws://, wss://

### 구조
- http요청을 보내고 웹소켓 핸드 셰이크를 진행한다.

### 웹소켓 업그레이드 요청
```json
GET / HTTP/1.1
host : localhost
Connection : upgrade // 웹소켓 프로토콜 업그레이드
Sec-WebSoket-key : 클라이언트값// 클라이언트와 서버의 값을 확인하기 위한 값, 검증을 위한 해시 문자열이 포함된다. 클라이언트와 서버의 값 확인 검증값
Upgrade : websoket
```
- http의 프로토콜로 요청은 보냈지만, 이후에 웹소켓 프로토콜로 변경 요청
- Connection : upgrade 웹소켓 연결을 업그레이드 하겠다.

### 웹소켓 업그레이드 응답
```json
HTTP/1.1 101 Switch protocols
Connection : Upgrade
Upgrade : websoket 
Sec-Websoket-key : 클라이언트 + 서버의 값 
```
### Sec-WebSoket-key 값을 검증하기 위한 헤더의 값
> Sec-Websoket-key 클라이언트에서 요청을 보낼때 16바이트의 base64 문자열을 포함시켜서 보내준다. 임의로 만든 문자열
> 서버에서는 특정한 값을 이 문자열에 포함시켜서 응답을 해준다.
> sha-1 암호화 문자열을 생성해서 클라이언트에게 응답
> 클라이언트가 이 값을 확인하고 웹소켓의 연결을 신뢰할 수 있는지 검증하기 위한 값

```sh
npm init -y

npm i ws
```

### 동물 카톡
> socket io 
> ws 방의 개념이나 소켓 관리 등이 좀더 수월하게 사용 가능하게 모던한 메서드를 제공한다.

```sh
npm init -y
npm i express ejs socket.io
```

## 자리 예약