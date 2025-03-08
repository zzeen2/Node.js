const express = require("express");
const fs = require("fs");
const app = express();

app.get("/",(req,res)=>[
    res.send([{title:"제목", content: "내용"}])
]);

app.get('/page', (req,res)=> {
    fs.readFile("./index.html", "utf-8", (err, data)=>{
        if (err) return res.send(err);
        res.send(data);
    })
})

app.get('/page2', (req,res)=> {
    fs.readFile("./index2.html", "utf-8", (err, data)=>{
        if (err) return res.send(err);
        res.send(data);
    })
})
app.get('/page3', (req,res)=> {
    fs.readFile("./index3.html", "utf-8", (err, data)=>{
        if (err) return res.send(err);
        res.send(data);
    })
})

//CRUD----------------------------------------------------------------------
//read
app.get()

//create
app.post()

//update
app.put()

//delete
app.delete

//---------------------------------------------------------------------------
app.listen(3000, ()=> {
    console.log("server on~")
});