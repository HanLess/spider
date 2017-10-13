var express = require("express")
var router = express.Router();
var getImage = require("../controllers/get_image")

router.get("/",getImage)

module.exports = router