exports.changeToPromise = function(){
	var argument = arguments , _this = this
	return new Promise(function(resolve,reject){
		var fun = Array.prototype.shift.call(argument)
		Array.prototype.push.call(argument,function(err,data1,data2){
			if(err){
				reject(err)
			}else{
				var d1 = data1 || undefined
				var d2 = data2 || undefined
				if(d1 && d2){
					resolve([d1,d2])
				}else{
					resolve(d1)
				}
				
			}
		})
		fun.apply(_this,argument)
	})
}