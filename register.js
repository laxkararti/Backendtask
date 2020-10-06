const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const User = require('../model/registration')



router.post("/api/v1/register",
  async (req, res) => {
      
      const {
          name,
          email,
          phone,
          password
      } = req.body;
   try {
          let user = await User.findOne({
           email
          });
          if (user) {
              return res.status(400).json({
                  msg: "User Already Exists"
              });
          }

         user = new User({
              name,
              email,
              phone,
              password
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
              "randomstring", {
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



router.post( "/api/v1/authenticate",
  async (req, res) => {

    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        email
      });
      if (!user)
        return res.status(400).json({
          message: "User Not Exist"
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password !"
        });

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token
          });
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
  }
);

 module.exports = router;