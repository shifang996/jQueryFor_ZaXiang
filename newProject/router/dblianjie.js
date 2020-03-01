var mongo = require('mongodb'); //引入模块

var MongoClient = mongo.MongoClient; //mongodb 客户端

var url = 'mongodb://127.0.0.1:27017'; //mongodb服务器地址

var dbName = 'QiMo' //要连接的库

// 查找方法
var find = function(client, collection, data, callback) {

        collection.find(data).toArray(function(err, result) {
            if (err) throw err;
            console.log("查找成功");

            callback(result) //数据传回回调函数

            client.close(); //释放连接
        })
    }
    // 删除一个方法{age:1}
var del = function(client, collection, data, callback) {
        collection.deleteOne(data, function(err, result) {
            if (err) throw err;
            console.log("删除成功");
            callback(result);
            client.close(); //释放连接
        })
    }
    // 增加一个方法
var insert = function(client, collection, data, callback) {
        collection.insert(data, function(err, result) {
            if (err) throw err;
            console.log("插入成功");
            callback(result)
            client.close(); //释放连接
        })
    }
    // 修改一个方法
    // mongo("update","user",[{name:"老王"},{age:888}],function(){})
var update = function(client, collection, data, callback) {
        collection.update(data[0], { $set: data[1] }, function(err, result) {
            if (err) throw err;
            console.log("修改成功");
            callback(result)
            client.close(); //释放连接
        })
    }
    //删除多个
var deleteMany = function(client, collection, data, callback) {
        collection.deleteMany(data, function(err, result) {
            if (err) throw err;
            console.log("删除成功");
            callback(result);
            client.close(); //释放连接
        })
    }
    //i 插入多个
var insertMany = function(client, collection, data, callback) {
        //			{name:1}
        //         [{},{}]
        collection.insertMany(data, function(err, result) {
            if (err) throw err;
            console.log("插入成功");
            callback(result)
            client.close(); //释放连接
        })
    }
    // 修改多个
var updateMany = function(client, collection, data, callback) {
    collection.updateMany(data[0], { $set: data[1] }, function(err, result) {
        if (err) throw err;
        console.log("修改成功");
        callback(result)
        client.close(); //释放连接
    })
}
var methodType = {
    find: find,
    del: del,
    insert: insert,
    update: update,
    deleteMany: deleteMany,
    insertMany: insertMany,
    updateMany: updateMany
}

// find    表           条件    回调函数  
module.exports = function(type, collections, data, callback) {
    // 连接数据库
    MongoClient.connect(url, function(err, client) {
        if (err) {
            console.log('链接失败');
            console.log(err);

        } else { // 链接成功
            var db = client.db(dbName); // 对数据库的链接

            var collection = db.collection(collections); // 对集合的链接

            methodType[type](client, collection, data, callback);


        }

    })


}