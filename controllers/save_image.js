var fs = require('fs')
var request = require("request")

module.exports = async function(req,res){
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
	await Promise.all(do_img).catch(function(err){
		if(err) console.log(err)
	})
	res.send(res_arr)
}