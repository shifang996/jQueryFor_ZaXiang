$(function(){
	loadList();
	function loadList(){
		$.ajax({
			url:"./json/productList.json",
			type:"get",
			dataType:"json",
			data:{},
			success:function(res){
				console.log(res);
				var str="";
				$.each(res,function(index,ele){
					str+='<dl pid="'+ele.id+'">'
							+'<dt><img src="'+ele.imgsrc+'" ></dt>'
							+'<dd>'+ele.proName+'</dd>'
							+'<dd>价格:>>><span>'+ele.price+'</span></dd>'
							+'<dd>能效等级:>>><span>'+ele.engery+'</span></dd>'
							+'<dd></dd>'
							+'<button type="button" class="productBtn">加入购物车</button>'
						+'</dl>'
				})
				$(".container").html(str);
				//添加的方法
				$(".productBtn").click(function(){
					//获取商品的id
					var dlId=$(this).parent().attr("pid");
					console.log(dlId);
					//获取商品的父元素
					var dlParent=$(this).parent();
					var shopList="";
					$.each(dlParent,function(index,ele){
						// console.log(ele.children[0].children[0].getAttribute('src'))
						// console.log(ele.children[2].firstElementChild.innerHTML);
						shopList+='<ul class="data">'
									+'<li><input type="checkbox" class="ck"/></li>'
									+'<li><img src="'+ele.children[0].children[0].getAttribute('src')+'" ></li>'
									+'<li>'+ele.children[1].innerHTML+'</li>'
									+'<li><button class="jian">-</button><input type="text" value="1" class="num"><button class="jia">+</button></li>'
									+'<li>'+ele.children[2].firstElementChild.innerHTML+'</li>'
									+'<li>'+0+'</li>'
									+'<li><button class="del">删除此条目</button></li>'
								+'</ul>'
					})
					$(".conShow").append(shopList);
					allPricePro();//计算总价的方法
				})
				
			}
		})
	}
	
	
	//全选的方法
	$("#allChecked").click(function(){
		var myChecked=$(this).prop("checked");
		$("input[type=checkbox]").prop("checked",myChecked);
		allPricePro();//计算总价的方法
	})
	
	//反向循环全选
	$(".conShow").on("change",".ck",function(){
		$.each($(".ck"),function(index,ele){
			if(ele.checked==true){
				$("#allChecked").prop("checked","checked");
			}else if(ele.checked==false){
				$("#allChecked").prop("checked","");
			}
		})
		allPricePro();//计算总价的方法
	})
	
	//计算总价的方法
	function allPricePro(){
		$(".conShow").on("change",".ck",function(){
			var allValue=[];
			$.each($(".ck"),function(index,ele){
				if(ele.checked==true){
					var ulsPar=$(this).parent().parent();
					var nowXiaoJi=ulsPar.children().eq(5).html();
					console.log(nowXiaoJi);
					allValue.push(nowXiaoJi);
				}
				console.log(allValue);
					var suoYouNum=0;
				$.each(allValue,function(index,ele){
					suoYouNum+=Number(ele);
				});
				$("#allvaluePrice").html(suoYouNum);
			})
		})
	}
	
	//删除的方法
	$(".conShow").on("click",".del",function(){
		$(this).parent().parent().detach();
	})
	
	//商品添加的方法
		$(".conShow").on("click",".jia",function(){
			var uls=$(this).parent().parent();
			var oldVal=Number($(this).prev().val());
			var newVal=Number(oldVal+1);
			uls.children().eq(3).find("input").val(newVal);
			var proPrice=Number(uls.children().eq(4).html());
			uls.children().eq(5).html(proPrice*newVal);
		})
		
	//商品减的方法
	$(".conShow").on("click",".jian",function(){
		var uls=$(this).parent().parent();
		var oldVal=Number($(this).next().val());
		if(oldVal<=1){
			oldVal=2;
		}
		var newVal=Number(oldVal-1);
		uls.children().eq(3).find("input").val(newVal);
		var proPrice=Number(uls.children().eq(4).html());
		uls.children().eq(5).html(proPrice*newVal);
	})
	
	//全部删除的方法
	$("#allDel").click(function(){
		$(".conShow").detach();
	})
	
})