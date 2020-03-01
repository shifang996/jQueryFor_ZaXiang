// nodejs--mongodb模块-
 // mongodb模块作用--连接和操作数据库
 var mongo=require("mongodb");
 var MongoClient=mongo.MongoClient; //mongodb 客户端
 var url="mongodb://127.0.0.1:27017";//数据库地址
 var dbName="SHOPCAR";
 
 // 查找方法       客户端    表           条件    回调
var  find=function(client,collections,selector,callback){
	
	
		collections.find(selector).toArray(function(err,result){
			if(err) throw err;
			console.log("查找成功");
			callback(result)//result---查询到的数据
			client.close();//释放连接
		})

}

//查找加筛选条件 加排序---mongodb排序 方法  sort({age:1}) //1 升序     -1降序
// 
// .skip(2)---跳过几条数据

//  .limit(2)--拿几条数据

var  findOrder=function(client,collections,selector,callback,orderSelector,pageCount,count){
				// {age:-1}   	 //跳过几条              拿几条
	collections.find(selector).skip(pageCount).limit(count).sort(orderSelector).toArray(function(err,result){
		if(err) throw err;
		console.log("查找成功");
		callback(result)//result---查询到的数据
		client.close();//释放连接
	})
}


 // 删除方法       客户端    表           条件    回调
var del=function( client, collections , selector,callback){
	
		collections.deleteOne(selector,function(err,result){
			if(err) throw err;
			console.log("删除成功")
			callback(result);
			client.close();//释放连接
			
		})
}
 //插入一个             客户端    表           条件    回调
var insert=function(client, collections , selector,callback){
		
	collections.insertOne(selector,function(err,result){
		if(err) throw err;
		console.log("插入成功");
		callback(result);
		client.close();//释放连接
	})

}
// 修改一个            客户端    表           条件    回调
var update=function(client, collections , selector,callback){
								// selector=[  {name:1}, {age:2,sex:"男"}]
	collections.updateOne(selector[0], {$set:selector[1]},function(err,result){
			if(err) throw err;
			console.log("修改成功");
			callback(result);
			client.close();//释放连接
	})

}

// 删除多个      		 客户端    表           条件    回调
var  delMany=function(client, collections , selector,callback){
	
		collections.deleteMany(selector,function(err,result){
				if(err) throw err;
				console.log("删除多个成功");
				callback(result);
				client.close();//释放连接
		})
	
	
}
//插入多个    			   客户端    表           条件    回调
var insertMany=function(client, collections , selector,callback){
				// [{name:1,age:2},{name:2,age:3}] 
	collections.insertMany( selector  ,function(err,result){
			if(err) throw err;
			console.log("增加多个成功");
			callback(result);
			client.close();//释放连接
	})

}
//修改多个            	客户端    表           条件    回调
var updateMany=function(client, collections , selector,callback){
							
	collections.updateMany(selector[0],{	$set:selector[1]  } ,function(err,result){
		if(err) throw err;
		console.log("修改多个成功")
		callback(result);//result.n=1  ok:1
		client.close();//释放连接
	})

}
var methodType={
	find:find,
	del:del,
	insert:insert,
	update:update,
	delMany:delMany,
	insertMany:insertMany,
	updateMany:updateMany,
	findOrder:findOrder
}

 
					//   操作类型    操作的表       条件     回调           排序      跳过几条   拿几条
 module.exports=function(type ,    collections ,  selector, callback,orderSelector,pageCount,count){
	 
	 MongoClient.connect(url,function(err,client){//连接数据库服务器
		var db=client.db(dbName);//连接库
		
		var collection=db.collection(collections);//连接表
		
		// type--根据type来调用上面的find或del等方法// find
		methodType[type] ( client,collection,selector,callback,orderSelector,pageCount,count);
	
		
		})
 }
 
