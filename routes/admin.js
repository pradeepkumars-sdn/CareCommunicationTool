const express = require('express')
const admin = express.Router();
const adminController = require('../controllers/admin/admin')
const authController = require('../auth/login')



admin.post('/all-nurses',adminController.getAllNurses )
admin.post('/add-user',adminController.addUser)
admin.post('/login',authController.login)














module.exports = admin