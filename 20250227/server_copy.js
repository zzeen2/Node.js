const express = require("express");

const app = express();
// 임시 데이터베이스
const data = [];

app.set("view engine", "ejs");

app.use((express.urlencoded({extended : false})))

console.log(app);

// GET/ HTTP/1.1
app.get("/", (req,res) => {
    //res.render("index", {name : "soon", count : 5, board : data });
    res.render("index")
})

app.get('/detail', (req,res) => {
    //console.log(req.query.index);
    const _data = data[req.query.index] ;
    res.render("detail", {
        index: _data.index,
        title: _data.title,
        content: _data.content
    });
})

app.post("/board", (req,res, next) =>{
    //console.dir(req.body.title);  
    data.push({index : data.length + 1, title : req.body.title, content : req.body.content})
    res.redirect("/");
})

app.delete("/detail", (req,res)=> {
    console.log("dd")
    data.splice(index,1);
})

app.listen(3000, ()=> {
    console.log("server on")
})