var cheerio = require("cheerio")
var request = require("request")
var fs = require("fs")
var path = require("path")
var changeToPromise = require('../tool/index').changeToPromise

module.exports = async function(req,res,next){
	var search_result,
	question = "平常人可以漂亮到什么程度"
	search_result = await changeToPromise(request.get,"https://www.zhihu.com/search?type=content&q=" + encodeURI(question))
	var $ = cheerio.load(search_result[1])
	var href = $("ul.list").find("li").eq(0).find("div.title").find("a").attr("href")
	var link = "https://www.zhihu.com" + href

	// var detail = await changeToPromise(request.get,link)
	// var _$ = cheerio.load(detail[1])
	// var src = _$("img.lazy").attr("src")
	// console.log(src)
	request.get(link,function(err,res,body){
		console.log(err)
		console.log(res)
		console.log(body)
	})
}