const express=require('express');
const fs=require('fs');
const status=require("express-status-monitor");

const app=express();
const port=8000;

app.use(status());

app.get('/',(req,res)=>
{
    fs.readFile("./sample.txt",(err,data)=>
    {
        res.end(data);
    })
});


app.listen(port,()=>
{
    console.log('Server Started');
});