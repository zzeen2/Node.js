// npm i ws
const webSocket = require('ws');
// soket.io

const ws = new webSocket.Server({port : 3000})

// express 서버 객체처럼 대기상태를 제공하는 메서드
// 특정 이벤트가 발생하면 콜백 함수를 실행하겠다.
// connection 연결 요청이 발생하면. 누가? 클라이언트가
// on 객체 : 이벤트를 등록할때 많이 사용된다.
// 여기서도 connection이벤트가 발생하면 전달한 콜백 함수를 호출하겠다.
// socket 클라이언트가 입장 할때마다 쌓인다.
ws.on('connection', (socket,req)=>{
    // soket에는 연결 요청한 클라이언트의 내용을 객체로 제공한다.
    // 클라이언트의 주소 즉 다시 데이터를 보내줘야할 호스트의 값이 포함되어있다.
    // 파싱된 객체의 값이 포함
    console.log("클라이언트 연결 요청")
    //console.log(socket);
    // 연결된 클라이언트의 주소가 socket에 포함된다.
    // socket에 이벤트 등록
    // message 기본으로 제공되는 이벤트
    // 기본으로 할당되어 있는 이벤트 키값
    // 소켓의 요청 메세지를 받으면
    // ws 객체에는 누가 연결을 지속하고있는지 내용이 포함되어있다.
    // 누군가 입장했을때 그것을 전파시키기위해서는 안에있는 socket(클라이언트)들 한테 정보를 전송해야한다.
    const rooms = {};
    const users = [];
    socket.on("message", (message) => {
        // event에는 메세지를 파싱한 객체의 내용이 할당된다.
        console.log(message.toString());
        // 모두가 이 내용을 봤으면 좋겠어
        // `브로드 캐스트` 데이터를 전파한다.
        // ws에는 연결된 모든 클라이언트가 포함되어있다.
        // ws.clients : 지금까지 입장한 모든 클라이언트가 포함되어있다.
        ws.clients.forEach((el)=> {
            // 연결되어있는 클라이언트 모두에게 서버에서 클라이언트로 데이터 전달
            // 한명의 클라이언트가 message라는 이벤트를 발생 시킬때마다 모두에게 데이터를 서버에서 클라이언트로 전달
            el.send(message.toString());
        });
        // message 데이터를 보냈을때,
        // 데이터를 보낸 조건을 가지고 채팅을 들어갈건지, 채팅을 작성할건지
        // message 객체로 전달
        // 객체를 파싱해서 데이터를 저장

        // message 내용을 객체로 받아서 객체를 파싱해서 데이터로 사용
        // 방 이름, 타입, 채팅 내용을 객체에서 꺼낼것임
        const msgString = message.toString();
        const jsonData = JSON.parse(msgString);
        const {roomName, type, content, username} = jsonData 

        // 유저 목록확인용
        if(type === "user_login"){
            users.push({socket, username}); // 소켓에 유저 정보가 있으니까 같이 푸시
            ws.clients.forEach((el)=>{
                el.send(JSON.stringify({type : "users", content : username}))
            })
        }

        switch(type){
            case "join" :
                if(roomName in rooms){
                    rooms[roomName].push({socket,username});
                    ws.clients.forEach((el)=>{
                        el.send(JSON.stringify({type : "jotin_user", content : `${username}님이 ${roomName} 방 입장`}))
                    })
                }
            break;
            case "create" : 
                if(roomName in rooms) return; // rooms 객체에 roomName이 있으면 다음 case문으로 넘어감
                // 비어있는방
                /**
                 * rooms = {
                 *      "병아리" : [{socket, "zzeen"},{socket,"zzeen2"}]
                 * }
                 */
                rooms[roomName] = [];
                ws.clients.forEach((el)=>{
                    el.send(JSON.stringify({type :"create_room", content : `${roomName} 방 생성`}))
                })
                
            break;
            case "message" :
                if(roomName in rooms){
                    rooms[roomName].forEach(({socket})=>{
                        socket.send(JSON.stringify({type : "room_chat", content : `${username} : ${content}`}));
                    })
                }
                
            break;
        }
    })
    socket.on('close',()=> {
        // 연결이 종료되었을떄

    })
})