const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userModel = require("../../containers/users/userSchema");
const constant = require("../../constant");
const admin = require("../../routes/admin");

module.exports = {
  getAllNurses: getAllNurses,
  addUser: addUser,
};

async function getAllNurses(req, res) {}

async function addUser(req, res) {
  try {
    let checkUser = await userModel.findOne({ email: req.body.email });
    if (checkUser) {
      res.json(constant.ALLREADY_EXIST, constant.USER_ALREADY_EXIST);
    } else {
      console.log(req.body);
    //   if (req.body.userType === "superadmin") {
    //     let adminData = new userModel();
    //     adminData.name = req.body.name;
    //     adminData.email = req.body.email;
    //     adminData.userType = req.body.userType;
    //     adminData.nursingCompany = req.body.nursingCompany;
    //     adminData.contact = req.body.contact;

    //     await adminData.save((err, result) => {
    //       if (err) {
    //         res.json(constant.ERROR_CODE, constant.INTERNAL_ERROR);
    //       } else {
    //         res.json(constant.SUCCESS_CODE, constant.ADDED_SUCCESS, result);
    //       }
    //     });
    //   }
      if (req.body.userType === "nursehome") {
        let nurseData = new userModel();
        nurseData.name = req.body.name;
        nurseData.email = req.body.email;
        nurseData.userType = req.body.userType;
        nurseData.nursingCompany = req.body.nursingCompany;
        nurseData.contact = req.body.contact;

        await nurseData.save((err, result) => {
          if (err) {
              console.log(err)
            res.json(constant.ERROR_CODE, constant.INTERNAL_ERROR);
          } else {
            res.json(constant.SUCCESS_CODE, constant.ADDED_SUCCESS, result);
          }
        });
      }
      if (req.body.userType === "assistiveLiving") {
        let aslivingData = new userModel();
        aslivingData.name = req.body.name;
        aslivingData.description = req.body.description;
        // aslivingData.email = req.body.email;
        // aslivingData.password = req.body.password;
        // aslivingData.userType = req.body.userType;
        // aslivingData.gender = req.body.gender;
        // aslivingData.dob = req.body.dob;
       

        await aslivingData.save((err, result) => {
          if (err) {
              console.log(err)
            res.json(constant.ERROR_CODE, constant.INTERNAL_ERROR);
          } else {
            res.json(constant.SUCCESS_CODE, constant.ADDED_SUCCESS, result);
          }
        });
      }
    }
  } catch (e) {
      console.log("check", e)
    res.json(constant.ERROR_CODE, constant.INTERNAL_ERROR);
  }
}
