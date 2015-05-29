/**
 * Created by 紫洋 on 2015/4/19.
 */
var Restaurant = require('../models/restaurant');
var restaurantDao = require('../dao/restaurantDao');
//var queryString = require('querystring');
function foodHandler(){

}
//添加美食
foodHandler.addFood=function(req,res){
    req.setEncoding('utf-8');
    var postData="";
    req.addListener("data",function(postDataChunk){
        postData += postDataChunk;
    });
    req.addListener("end",function(){
        console.log("美食信息接收完毕！");
        var params = JSON.parse(postData);
        var restId = params.restId;
        var foodName = params.name;
        var foodPrice = params.price;
        var foodPicture = params.picture;
        var foodType = params.type;
        console.log("RestaurantId:"+restId);
        var conditions = {_id:restId};
        var update ={
            "$push":{food:{
                name:foodName,
                price:foodPrice,
                picture:foodPicture,
                type:foodType
            }}};
        //更新该餐馆的美食信息
        restaurantDao.updateRestaurantInfo(conditions,update,null,function(error){
            if (error) {
                res.json({message:'添加美食失败！'});
            }
            else{
                res.json({message:'添加美食成功！'});
            }
        });
    });
};

//修改美食
foodHandler.modifyFoodInfo =function(req,res){
    req.setEncoding('utf-8');
    var postData = "";
    req.addListener("data",function(postDataChunk){
        postData += postDataChunk;
    });
    req.addListener("end",function(){
        var params = JSON.parse(postData);
        var restId = params.restId;
        var foodOldName = params.oldName;
        var foodNewName = params.newName;
        var foodPrice = params.price;
        var foodPicture = params.picture;
        var foodTag = params.type;
        console.log("RestaurantId:"+restId);
        console.log("修改的美食名称为："+foodOldName);
        var condition = {
            _id: restId,
            food: {$elemMatch: {name: foodOldName}}
        };
        var update = {
            "$set": {
                    "food.$.name": foodNewName,
                    "food.$.price": foodPrice,
                    "food.$.picture": foodPicture,
                    "food.$.type": foodTag
                }
        };

        restaurantDao.updateRestaurantInfo(condition,update,null,function(error,message){
            if (error) {
                res.json({message:'修改美食失败！'});
            }
            else{
                res.json({message:'修改美食成功！'});
            }
        });
    });
};

//查看该餐馆的所有美食
foodHandler.viewAllFood = function(req,res){
    req.setEncoding('utf-8');
    var postData = "";
    req.addListener("data",function(postDataChunk){
        postData += postDataChunk;
    });
    req.addListener("end",function() {
        var params = JSON.parse(postData);
        var restId = params.restId;
        restaurantDao.findRestaurantFoodById(restId, function (err, foods) {
            if (err) {
                console.log(err);
            } else {
                res.json(foods);
            }
        });
    });
};

//查看该餐馆的某一美食。注：部分指定内嵌数组中的元素需要用$elemMatch
foodHandler.viewOneFood = function(req,res){
    req.setEncoding('utf-8');
    var postData = "";
    req.addListener("data",function(postDataChunk){
        postData += postDataChunk;
    });
    req.addListener("end",function() {
        var params = JSON.parse(postData);
        var restId = params.restId;
        var foodName = params.name;
        console.log("查看的美食为："+foodName);
        var condition ={
            _id:restId,
        food:{$elemMatch:
            {name:foodName}
        }};
        restaurantDao.findOneFood(condition, function (err, food) {
            if (err) {
               // console.log(err);
            } else {
                res.json(food);
            }
        });
    });
};


//删除美食
foodHandler.deleteFood = function(req,res){
    req.setEncoding('utf-8');
    var postData = "";
    req.addListener("data",function(postDataChunk){
        postData += postDataChunk;
    });
    req.addListener("end",function(){
        var params = JSON.parse(postData);
        var restId = params.restId;
        var foodName = params.name;
        console.log("删除的美食名称是："+foodName);
        var condition = {
            _id:restId
        };

        var update = {
            "$pull": {
                food:
                { name:foodName}

            }
        };
        restaurantDao.updateRestaurantInfo(condition,update,null,function(error,message){
            if (error) {
                res.json({message:'删除美食失败！'});
            }
            else{
                res.json({message:'删除美食成功！'});
            }
        });
    });
}
module.exports = foodHandler;