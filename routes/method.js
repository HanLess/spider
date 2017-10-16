var express = require("express")
var router = express.Router();
var getImage = require("../controllers/get_image")
var request = require("request")
var fs = require("fs")

router.get("/index",function(req,res){
	res.render("get")
})

router.get("/",getImage)

router.post("/saveIamge",async function(req,res){
	var imgs = req.body.list
	var res_arr = []

	var do_img = imgs.map((val,i) => {
		return new Promise(function(resolve,reject){
			if(imgs[i].length > 0 && imgs[i].search("http") > -1){
						let img_path = "/images/" + i.toString() + "_" + (new Date()).getTime().toString() + ".png"
						res_arr.push(img_path)
						let write = fs.createWriteStream("./public" + img_path)
						request.get(imgs[i]).pipe(write)
						write.on("close",function(){
							resolve()
						})
			}else{
				resolve()
			}
		})
	})
	console.log(do_img.length , imgs.length)
	await Promise.all(do_img).catch(function(err){
		if(err) console.log(err)
	})
	console.log("down all")
	res.send(res_arr)
})

module.exports = router