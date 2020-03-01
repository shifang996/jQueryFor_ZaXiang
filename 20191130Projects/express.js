var express = require('express');
var app = express();
//post访问
var bodyParse = require('body-parser')
var path = require('path')
app.use(express.static(path.join(__dirname,"public")))

app.all('*', function(req, res, next) {             //设置跨域访问
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
 });
 app.use(bodyParse.urlencoded({extended:false}));
 
var shopListWeb=require("./router/user.js");
app.use("/users",shopListWeb);

app.listen('3000',"127.0.0.1",function(){
     console.log('-------服务器使用正常------');
 })