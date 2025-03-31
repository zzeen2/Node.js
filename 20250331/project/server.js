const express = require("express");
const socketio = require("socket.io"); 
const app = express();

// 서버 대기상태
// 서버의 대기상태로 만들고, 반환된 객체의 안에는 서버의 호스트정보와 포트번호가 할당되어있는 객체를 반환한다.
const server = app.listen(3000, (req,res)=> {
    console.log("server on");
})
// server 객체가 필요한 이유는 
// 웹소켓 객체를 생성할 것

// socketio 생성자 함수를 호출하고 객체를 반환하는 내용을 제공한다. >> ws 소켓 서버라고 생각하면됨
// socketio 라이브러리 는 require("socket.io")에서 가져온 함수를 호출한 순간 
// 서버 객체를 만들고, 정적 라우팅으로 이 서버 호스트에 ws 프로토콜 요청 보낼 수 있는 객체를 만들어주는 js를 제공한다.
// 호스트/socket.io/socket.io.js
// 이 js파일에는 현재 서버의 호스트로 ws프로토콜 요청을 보낼 수 있는 객체를 생성하는 로직이 작성되어있다.
// 백엔드는 block.com => `프록시 서버`wsBlock.com 
const io = socketio(server);

app.set("view engine", "ejs");

app.get("/",(req, res)=> {
    res.render("chat")
})

// 접속한 유저 관리 배열
let users = []; // 식별자(socket.id)를 관리하기 위함

io.on('connection', (socket)=> {
    //console.log(socket); //> 소켓은 데이터를 받을수 있는 곳! , 입구!
    //클라이언트에게 메세지를 즉 데이터를 보낼수 있는 통로
    users.push(socket.id); // socket.id : 소켓의 고유 식별자 (클라이언트의 고유 식별자)
    // 고유식별자를 가지고 원하는 클라이언트에게만 보낼 수 있다.
    console.log(users);

    io.sockets.emit("userConnect", users);

    socket.on('whisper', ({id, msg}) => {
        // to("요청을 받을 주체") : 요청을 누구에게 보낼것인지
        // 식별자로 메세지를 전달 즉 귓속말임
        // emit() : 메세지를 발생시키는데, 내가 지정한 이벤트에 조건에 맞는 내용을 호출하겠다. 클라이언트에 send()하는걸 메서드로 이미 만들어져있는 것임
        // on으로 지정한 whisper이러한 이벤트를 호출할때 emit로 호출한다. 
        // >> 서버에서 호출하면 클라이언트에게 ()내부의 이벤트 호출을 요구, 클라이언트에서 호출하면 서버에서 ()내부의 이벤트 호출을 요구 !
        // emit 첫번째 매개변수===whisper와같은 이벤트 이름, 두번째부터 매개변수===여러 키값을 콤마로 구분해서 전달하면 순서대로 전달됨, 객체로 전달하면 객체로 전달된다.
        // id 는 접속했을때 고유 식별자가 생성된다. 
        io.sockets.to(id).emit("whisper", msg);

    })

    // room이라는 조건문을 만들어서 제어를 해준것
    // joinRoom : 해당 방에 클라이언트 입장
    socket.on("joinRoom", (room, name)=> {
        // 고유의 해시값으로 id를 가지고있는 소켓들
        // class 처럼 복수의 클라이언트가 가질 수 있는 값
        // 복수의 클라이언트를 가르키는 값 >> room으로 만들 수 있음 ( switch문으로 하드코딩 했던거 ) 
        socket.join(room);
        // 이미 해당 방에 접속한 클라이언트를 가르키는 값이 하나 더 생성된 것.
        // 예를들어 병아리를 room 변수에 전달하면, 병아리방에 있는 모든 사람들이 메세지를 받을 수 있게된다.

        io.to(room).emit("joinRoom", room, name); // 누가 입장했는지 알리기 위한 이벤트를 만들거임, 클라이언트한테 전달하겠지?
    })

    // 방 떠나기
    socket.on('leaveRoom', (room, name) => {
        socket.leave(room); // 객체 안의 방의 값의 제거
        io.to(room).emit('leaveRoom', room, name)
    })

    // 채팅하기
    socket.on("chat", (room, name, msg) =>{
        io.to(room).emit("chat", name, msg);
    })




    socket.on('disconnect', ()=> {
        //console.log(socket); //> transport close 
        console.log(socket.id);
        users = users.filter((el) => !(el === socket.id))
        console.log(users);
        io.sockets.emit("userConnect", users);
    })
})