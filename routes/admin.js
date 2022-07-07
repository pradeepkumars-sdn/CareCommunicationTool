const express = require('express')
const admin = express.Router();
const adminController = require('../controllers/admin/admin')

admin.post('/all-nurses',adminController.getAllNurses )
admin.post('/add-user',adminController.addUser)












module.exports = admin