$(function(){
	var start = 3;
	var loading = false
	$("button#btn_get").click(function(){
		if(!loading){
			loading = true
			$.ajax({
				url : "/getImage/start",
				type : 'get',
				data : {
					start : start
				},
				success : function(data){
					var img_arr = []
					$("#contain").html(data.data)
					start = data.start
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
							loading = false
						}
					})
				}
			})
		}
		
	})
	
})