const bodyParser = require('body-parser');
const express = require('express');
const mysql = require('mysql');
const server = express();
server.use(bodyParser.json());

server.use(express.json());

// must use this for cross api call 
let cors = require("cors");
server.use(cors());


// server.use((req,res,next)=>{
//     res.setHeader('Access-Control-Allow-Origin','*');
//     res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
//     res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
//     next(); 
// })



// connection 
const db =  mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"sql_node_angular"
});
db.connect(function (error){
    if(error){
        console.log(`${error}error while connecting to the databse`);
    }else{
        console.log('App connected to the database');
    }
});

server.listen(8000,function check(error){
    if(error) console.log('Error while conneting to the server');
    // else console.log("server started on port no 8080");
});


// insert to the database
server.post("/api/student/add",(req,res) =>{
    let details ={
        stdName: req.body.stdName,
        course: req.body.course,
        fee: req.body.fee,
    };

    
    let sql = "INSERT INTO stdDetail SET ?";
    db.query(sql,details,(error)=>{
        if(error){
            res.send({
                status:false, message:"faild to create student id"
            });
        }else{
            res.send({status:true , message:"student id created successfully "});
        }
    });
});

// all student view
server.get("/api/student/get",(req,res)=>{
    let id = req.body;
    let sql  = "SELECT * FROM stdDetail";
    db.query(sql,function(error,result){
    if(error){
        console.log("error connecting ")
    }else{
        res.send({status:true,data:result});
    }
});
});


// get student by id
server.get("/api/student/get/:id",(req,res)=>{
    let id = req.params.id;
    let sql  = "SELECT * FROM stdDetail WHERE id="+id;

    db.query(sql,function(error,result){
    if(error){
        console.log("error connecting ")
    }else{
        res.send({status:true,data:result});
    }
});
});

// update student data
server.put('/api/student/update/:id',(req,res)=>{
    // this is for api/postman
    // let sql = "UPDATE stdDetail SET stdName ='"+ req.params.stdName +"',course = '"+req.params.course+"',fee = '"+req.params.fee+"' WHERE id='"+req.params.id+"'";
    
    // let query = db.query(sql,(error,result)=>{
    //     if(error){
    //         res.send({status:false,message:`${error}`});
    //     }else{
    //         res.send({status:true,message:"student updated"});
    //     }
    // });
    
    let details ={
        stdName: req.body.stdName,
        course: req.body.course,
        fee: req.body.fee,
    };

    let sql = "update stdDetail set stdName ='"+ req.body.stdName +"',course = '"+ req.body.course +"',fee = '"+ req.body.fee +"' WHERE id='"+req.params.id+"'";
    db.query(sql,details,(error)=>{
        if(error){
            res.send({
                status:false, message:"faild to create student id"
            });
        }else{
            res.send({status:true , message:"student id created successfully "});
        }
    });
});

// delete student data 
server.delete('/api/student/delete/:id',(req,res)=>{
    // let id = req.params.id;
    let sql = "DELETE FROM stdDetail WHERE id ='"+req.params.id+"'";
    let query  = db.query(sql,(error,result)=>{
        if(error){
            res.send({status:false,message:`${error}`});
        }else{
            res.send({status:true , message:"student deleted"});
        }
    });
});