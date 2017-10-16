var cheerio = require("cheerio")
var request = require("request")
var fs = require("fs")
var path = require("path")
var changeToPromise = require('../tool/index').changeToPromise

module.exports = async function(req,res,next){
	var include = encodeURI("data[*].is_normal,admin_closed_comment,reward_info,is_collapsed,annotation_action,annotation_detail,collapse_reason,is_sticky,collapsed_by,suggest_edit,comment_count,can_comment,content,editable_content,voteup_count,reshipment_settings,comment_permission,created_time,updated_time,review_info,question,excerpt,relationship.is_authorized,is_author,voting,is_thanked,is_nothelp,upvoted_followees;data[*].mark_infos[*].url;data[*].author.follower_count,badge[?(type=best_answerer)].topics")
	var limit = 20;
	var offset = 3;
	sort_by = "default";
	var req_url = "https://www.zhihu.com/api/v4/questions/50426133/answers?include="+include+"&limit="+limit+"&offset="+offset+"&sort_by="+sort_by

	var _data = (await changeToPromise(request.get,req_url,{
			"auth" : {
				'bearer' : "Mi4xN255NUFBQUFBQUFBTUFLLUFrRW5EQmNBQUFCaEFsVk5ac2dDV2dDYjJKeS1XMWxrSnpTS3ZpejhKN0RWdVZrUlZn|1507539814|2c213b9b76f86e32877a9d7d8e9dfa0c129eb2c3"
			}
		}))[0]
	var data = JSON.parse(_data.body).data
	var imgList = data.map((val,index) => {
		return val.content
	})
	res.send('<div id="data" style="display:none">'+ imgList.join("") +'</div>')
}



