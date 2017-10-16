var express = require("express")
var router = express.Router();
var getImage = require("../controllers/get_image")
var saveIamge = require('../controllers/save_image')
var request = require("request")
var fs = require("fs")

/*
	域名是localhost会出现问题，改成标准三级域名
*/
router.get("/",function(req,res){
	res.render("get")
})

router.get("/start",getImage)

router.post("/saveIamge",saveIamge)

module.exports = router