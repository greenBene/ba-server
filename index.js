//var http = require('http');
var mysql = require('mysql');
var express = require('express')
var parser = require('body-parser')

var app = express()

// Setup for Database connection

var con = mysql.createConnection({
  host: "localhost",
  user: "ba-accuracy-logger",
  password: "roX44N7$y#mzeU*#T5@z",
  database: "thesis"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(parser.urlencoded({ extended: true })); // support encoded bodies



app.post("/post", function(req, res){
  var body = req.body;

  var model = body.model;
  var os = body.os;
  var timeSinceParking = body.timeSinceParking;
  var accuracy = body.accuracy;
  var test = body.test;

  console.log("Received message");

  if(model === undefined
    || os === undefined
    || timeSinceParking === undefined
    || accuracy === undefined){

    res.sendStatus(400);
    return;
  }

  var sql = "INSERT INTO accuracy VALUES (0, current_timestamp(), '" + model +  "', '" + os + "', " + timeSinceParking +  ", " + accuracy +  ");"

  con.query(sql, function (err, res) {
    if (err){
      console.log(err);
      res.sendStatus(500);
    }

    });

  res.sendStatus(200)
});

app.get("/", (req, res) => res.send("I'm alive!"));

app.listen(8080)
