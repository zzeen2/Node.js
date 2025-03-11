const express = require('express');
const path = require('path');
const boardRouter = require('./routers/board.router');

const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(boardRouter);


app.listen(3000, () => {
    console.log('server on~');
})