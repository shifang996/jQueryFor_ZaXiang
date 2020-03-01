$(function() {
	loadList("全部"); //渲染列表
	//渲染数据列表
	function loadList(shuJu) {
		$.ajax({
			url: "http://127.0.0.1:3000/users/findList",
			type: "post",
			dataType: "json",
			data: {
				action: shuJu
			},
			success: function(res) {
				console.log(res);
				var str = "";
				$.each(res, function(index, ele) {
					str += '<tr pid="' + ele._id + '">' +
						'<td><img src="' + ele.imgsrc + '"/></td>' +
						'<td>' + ele.pname + '</td>' +
						'<td>' + ele.fenlei + '</td>' +
						'<td>' + ele.oldPrice + '</td>' +
						'<td>' + ele.nowPrice + '</td>' +
						'<td>' + ele.kuCun + '</td>' +
						'<td>' + JSON.parse(ele.biaohong) + '</td>' +
						'<td>' + JSON.parse(ele.aihao) + '</td>' +
						'<td>' +
						'<button  class="edit">修改</button>' +
						'<button  class="del">删除</button>' +
						'</td>' +
						'</tr>'
				});
				$("tbody").html(str);
				deleteUser(); //删除的方法
				editUser(); //修改的方法
			}
		})
	}


	//修改的方法
	function editUser() {
		$(".edit").click(function() {
			var pid = $(this).parent().parent().attr("pid");
			//获取父亲元素
			var trs = $(this).parent().parent();
			if ($(this).html() == "修改") {
				$(this).html("完成");
				$("#imgsrc").val(trs.children().eq(0).children().attr("src").split("/")[1].split(".")[0]); //获取图片的地址
				$("#pname").val(trs.children().eq(1).html());
				var mySelVal = trs.children().eq(2).html();
				$("#mysel").val(mySelVal); //商品名称
				$("#oldprice").val(trs.children().eq(3).html());
				$("#price").val(trs.children().eq(4).html());
				$("#num").val(trs.children().eq(5).html());
				var bhVal = trs.children().eq(6).html();
				$("input[value=" + bhVal + "]").prop("checked", "checked");
				//多选框的修改
				var checkboxVal = trs.children().eq(7).html().split(","); //转成数组
				console.log(checkboxVal);
				$.each($("input[type=checkbox]"), function(index, ele) {
					ele.checked = false;
				});
				$.each(checkboxVal, function(index, ele) {
					$("input[value=" + ele + "]").prop("checked", "checked");
				})

			} else if ($(this).html() == "完成") {
				$(this).html("修改");
				//调用ajax使得数据的修改
				//循环爱好数组数据
				var aihaoStr = [];
				$.each($("input[type=checkbox]"), function(index, ele) {
					if (ele.checked == true) {
						aihaoStr.push(ele.value);
					}
				})
				console.log(aihaoStr);
				//标红数据
				var biaoH = [];
				$.each($("input[name=biaohong]"), function(index, ele) {
					if (ele.checked == true) {
						biaoH.push(ele.value);
					}
				})
				console.log(biaoH);
				console.log($("#mysel").val());
				$.ajax({
					url: "http://127.0.0.1:3000/users/updateList",
					type: "post",
					dataType: "json",
					data: {
						_id: pid,
						imgsrc: "imges/" + $("#imgsrc").val() + ".png",
						pname: $("#pname").val(),
						fenlei: $("#mysel").val(),
						oldPrice: $("#oldprice").val(),
						nowPrice: $("#price").val(),
						kuCun: $("#num").val(),
						biaohong: JSON.stringify(biaoH),
						aihao: JSON.stringify(aihaoStr)
					},
					success: function(res) {
						alert(res.success);
						loadList("全部"); //渲染列表
						//清空输入框列表
						location.reload(); //自动刷新页面,免于清楚文本矿的数值
					}
				})
			}
		})
	}


	//删除的方法
	function deleteUser() {
		$(".del").click(function() {
			var pid = $(this).parent().parent().attr("pid");
			console.log(pid);
			$.ajax({
				url: "http://127.0.0.1:3000/users/delList",
				type: "post",
				dataType: "json",
				data: {
					_id: pid
				},
				success: function(res) {
					alert(res.success);
					loadList("全部");
				}
			})
		})
	}


	//添加数据
	$("#addPro").click(function() {
		//循环爱好数组数据
		var aihaoStr = [];
		$.each($("input[type=checkbox]"), function(index, ele) {
			if (ele.checked == true) {
				aihaoStr.push(ele.value);
			}
		})
		console.log(aihaoStr);
		//标红数据
		var biaoH = [];
		$.each($("input[name=biaohong]"), function(index, ele) {
			if (ele.checked == true) {
				biaoH.push(ele.value);
			}
		})
		console.log(biaoH);
		console.log($("#mysel").val());
		$.ajax({
			url: "http://127.0.0.1:3000/users/addList",
			type: "post",
			dataType: "json",
			data: {
				imgsrc: "imges/" + $("#imgsrc").val() + ".png",
				pname: $("#pname").val(),
				fenlei: $("#mysel").val(),
				oldPrice: $("#oldprice").val(),
				nowPrice: $("#price").val(),
				kuCun: $("#num").val(),
				biaohong: JSON.stringify(biaoH),
				aihao: JSON.stringify(aihaoStr)
			},
			success: function(res) {
				alert(res.success);
				loadList("全部"); //渲染列表
				//清空输入框列表
				location.reload(); //自动刷新页面,免于清楚文本矿的数值
			}
		})
	});


	//点击渲染方式内容
	$(".fenlei a").click(function() {
		var action = $(this).html();
		console.log(action);
		//发送到后台,进行指定的渲染
		loadList(action);
	})

	//全部删除
	$(".allDel").click(function() {
		$.each($(".del"), function(index, ele) {
			var pid = ele.parentNode.parentNode.getAttribute("pid");
			console.log(pid);
			$.ajax({
				url: "http://127.0.0.1:3000/users/delList",
				type: "post",
				dataType: "json",
				data: {
					_id: pid
				},
				success: function(res) {
					loadList("全部");
				}
			})
		})
	})

})
