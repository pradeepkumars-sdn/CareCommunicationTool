const express = require('express');
const constant = require('../constant')
const userModel = require('../containers/users/userSchema')
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const config = require("../config/config").get(process.env.NODE_ENV);

const {SECRETKEY } = config;

module.exports = {
    login:login
}

async function login(req, res){
    const {email, passwoord} = req.body
    if(req.body && req.body.email){
        const email = req.body.email.toLowerCase();
        let checkUser = await userModel.findOne({email:email, userType: { $eq: "nursehome" }});
        

        if(!checkUser){
            res.status(constant.ERROR_CODE).json(constant.USER_DOEST_NOT_EXIST)
        }else{
            const isMatch = await bcrypt.compare(req.body.password, checkUser.password);

            if (!isMatch) {
              return res.status(400).json({
                message: "Incorrect Password !",
              });
            }
            const payload = {
              user: {
                id: checkUser.id,
              },
            };
            const token = jwt.sign(
              payload,
              SECRETKEY,
              {
                expiresIn: "3h",
              },
              (err, token) => {
                if (err) throw err;
                res.status(200).json({
                  token,
                });
              }
            );

        }

       
    }
    
}