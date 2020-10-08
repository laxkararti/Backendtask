const express = require('express');
const bodyParser= require('body-parser');
let mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(function(req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

  //Db connection
  const uri = 'mongodb://localhost:27017/task';

  mongoose.Promise = global.Promise;
  mongoose.connect(uri, {
   useNewUrlParser: true, useUnifiedTopology:true
  }).then(() => {
    console.log("db connected");
  })
   error => {
      console.log('Database could not connected: ' + error)
   }
   
  //middleware
  app.use(bodyParser.json());
  app.use(cors());

const registerroute = require("./routes/register");
const userroute = require("./routes/users")
 app.use('/', registerroute)
app.use('/', userroute)

  app.listen(8000, () => {
    console.log('Example app listening on port 8000!');
  });
module.exports = app;
