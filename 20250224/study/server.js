const fs = require('fs');
const express  = require('express');
const path = require('path')
const app = express()
const PORT = 3000;

app.use(express.static(path.join(__dirname,"public")));

app.get('/', (req,res)=> {
    const filePath = path.join(__dirname, "views", "index.html")
    fs.readFile(filePath, "utf8", (err,data)=> {
        if (err) return res.send("404 not exsist page")
        res.send(data);
    })
})

app.get('/login', (req,res)=> {
    const filePath = path.join(__dirname, "views", "login.html")
    fs.readFile(filePath, "utf8", (err,data)=> {
        if (err) return res.send("404 not exsist page")
        res.send(data);
    })
})

app.listen(PORT, () => {
    console.log("server on~")
})
