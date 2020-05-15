// interface of the admin.js from controllers

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var admin = require('../controllers/admin')
const mysql = require('mysql')

router.use(bodyParser.urlencoded({extended:true}));

router.get('/admindash', admin.getAdmin); //load the admin page from view
router.post('/approve', admin.approvePost); //perform the action of approving the pending post
router.post('/decline', admin.declinePost); //perform the action of declining the pending post





module.exports = router;
