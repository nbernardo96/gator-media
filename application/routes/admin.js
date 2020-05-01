var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var admin = require('../controllers/admin')
const mysql = require('mysql')

router.use(bodyParser.urlencoded({extended:true}));

router.get('/admin', admin.getAdmin);
router.post('/approve', admin.approvePost);
router.post('/decline', admin.declinePost);





module.exports = router;
