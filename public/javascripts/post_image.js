$(function(){
	$("button#btn_get").click(function(){
		$.ajax({
			url : "/getImage",
			type : 'get',
			success : function(data){
				var img_arr = []
				$("body").html(data)
				$("div#data").find("img").each(function(){
					img_arr.push($(this).attr("data-original"))
				})
				$("div#data").remove()

				$.ajax({
					url : "/getImage/saveIamge",
					type : "post",
					dataType : "json",
					data : {
						list:img_arr
					},
					success : function(data){
						console.log(data.length)
						for(var i = 0;i < data.length;i ++){
							let _img = document.createElement("img")
							_img.setAttribute("src",data[i])
							document.querySelector("body").appendChild(_img)
						}
					}
				})
			}
		})
	})
	
})