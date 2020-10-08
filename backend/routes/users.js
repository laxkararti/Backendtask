const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const User = require('../model/user');
const register = require('../model/registration');
const requirelogin = require("../middleware/requirelogin");
const { ObjectId } = require('mongodb');




router.post("/api/v1/user",requirelogin, async (req, res) => {
       
    const registeruser = await register.findById(req.user.id);
     
    const {
          name,
          email,
          phone,
          password
      } = req.body;
     
 
   try {

       let usern = await User.findOne({
        email
       });
       if (usern) {
           return res.status(400).json({
               msg: "User Already Exists"
           });
       }
   
           const user = new User({
              name ,
              email,
              phone ,
              password,
              admin : registeruser.id      
              });
          
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(password, salt);

          await user.save();

          const payload = {
              user: {
                  id: user.id
              }
          };

          jwt.sign(
              payload,
              "userstring", {
                  expiresIn: 15000
              },
              (err, token) => {
                  if (err) throw err;
                  res.status(200).json({
                      token
                  });
              }
          );
      } catch (err) {
          console.log(err.message);
          res.status(500).send(err);
      }
  }
);





//for getting list of all users 

router.get('/api/v1/users', requirelogin,  (req, res, next) => {
    var alluser = User.find({admin: req.user.id})
    alluser.exec(function(err,data){
      if(err) throw err;
      res.send(data);
    })
  });

  
//for edit user

router.put('/api/v1/users/:id', requirelogin, (req, res, next)=>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with this id')
     var user = {
         name: req.body.name,
         email: req.body.email,
         phone: req.body.phone
     };
      
     User.findByIdAndUpdate(req.params.id,{$set: user}, {next: true},(err , doc)=>{
         if(!err){
             res.send(doc);
         }else{
             console.log(err)
         }
     });
});


//for deleting the user

router.delete('/api/v1/users/:id', requirelogin, (req, res, next)=>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with this id')
     
     User.findByIdAndRemove(req.params.id,(err , doc)=>{
         if(!err){
             res.send(doc);
         }else{
             console.log(err)
         }
     });
});





 module.exports = router;
