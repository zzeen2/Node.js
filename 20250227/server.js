const express = require("express");

const app = express();
const data = [];

app.set("view engine", "ejs");

app.use((express.urlencoded({extended : false})))
console.log(app);

app.get("/", (req,res) => {
    res.render("index", {name : "soon", count : 5, board : data });
})

app.get('/detail', (req, res) => {
    const index = parseInt(req.query.index);
    res.render("detail", data[index]);  
});


app.post("/board", (req, res) => {
    // 인덱스를 0부터 시작하게 변경
    data.push({index: data.length, title: req.body.title, content: req.body.content})
    res.redirect("/");
})

app.get("/delete", (req, res) => {
    const index = parseInt(req.query.index);
    if(index >= 0 && index < data.length) {
        data.splice(index, 1); 
        for(let i = 0; i < data.length; i++) {
            data[i].index = i;
        }
    }
    res.redirect("/");
});

app.get("/edit", (req, res) => {
    console.log("받은.query:", req.query);
    console.log("인덱스:", req.query.index);
    res.render("edit", {index: req.query.index});
})

app.post("/edit", (req, res) => {

    const index = parseInt(req.body.index);
    
    if(index >= 0 && index < data.length) {
        data[index].title = req.body.editTitle;
        data[index].content = req.body.editContent;
        console.log("수정 완료:", data[index]);
    } else {
        console.log("유효하지 않은 인덱스:", index);
    }
    
    res.redirect("/");
});

app.listen(3000, ()=> {
    console.log("server on")
})

