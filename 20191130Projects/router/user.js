var express = require("express")
var router = express.Router()
var mongo= require("./dblianjie.js")
var mongodb=require("mongodb");
var ObjectId=mongodb.ObjectId;

//添加数据
router.post("/addList",function(req,res){
	var userInfo={
		imgsrc:req.body.imgsrc,
		pname:req.body.pname,
		fenlei:req.body.fenlei,
		oldPrice:req.body.oldPrice,
		nowPrice:req.body.nowPrice,
		kuCun:req.body.kuCun,
		biaohong:req.body.biaohong,
		aihao:req.body.aihao
	};
	mongo("insert","usersList",userInfo,function(result){
		res.send({success:"数据添加成功"});
	})
})

//删除接口
router.post("/delList",function(req,res){
	mongo("del","usersList",{_id:ObjectId(req.body._id)},function(result){
		res.send({success:"删除成功"});
	})
})

//数据修改接口
router.post("/updateList",function(req,res){
	var userInfo={
		imgsrc:req.body.imgsrc,
		pname:req.body.pname,
		fenlei:req.body.fenlei,
		oldPrice:req.body.oldPrice,
		nowPrice:req.body.nowPrice,
		kuCun:req.body.kuCun,
		biaohong:req.body.biaohong,
		aihao:req.body.aihao
	};
	mongo("update","usersList",[{_id:ObjectId(req.body._id)},userInfo],function(result){
		res.send({success:"修改成功"});
	})
})

//查找接口***渲染接口***分类渲染接口
router.post("/findList",function(req,res){
	//赋值action
	var tiaoJian={};
	if(req.body.action=="全部"){
		tiaoJian={};
	}else if(req.body.action!="全部"){
		tiaoJian.fenlei=req.body.action;
	}
	mongo("find","usersList",tiaoJian,function(result){
		res.send(result);
	})
});


module.exports=router;