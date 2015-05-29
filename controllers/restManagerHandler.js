/**
 * Created by 紫洋 on 2015/4/13.
 */
var Restaurant = require('../models/restaurant');
var restaurantDao = require('../dao/restaurantDao');
//var queryString = require('querystring');
function restManagerHandler(){

}
//餐厅经理注册,此处只是加了简单的注册功能，对于注册的用户的验证这里还没有涉及到，有待于之后的添加
restManagerHandler.regist = function(req,res){
    req.setEncoding('utf-8');
    var postData="";
    req.addListener("data",function(postDataChunk){
        postData += postDataChunk;
    });
    req.addListener("end",function(){
        console.log('数据接收完毕');
        var params = JSON.parse(postData);
        var restName = params.restName;
        var restManagerName = params.restManagerName;
        var restManagerPass = params.restManagerPass;
        var address = params.address;
        var picture = params.picture;
        var longitude = params.longitude;
        var latitude = params.latitude;
        var contact = params.contact;
        var city = params.city;
        var type = params.type;
        console.log("注册餐厅经理的信息："+restManagerName);
        var restaurant = new Restaurant({
           restName:restName,
           restManagerName:restManagerName,
           restManagerPass:restManagerPass,
           address:address,
           picture:picture,
           longitude:longitude,
           latitude:latitude,
           contact:contact,
           city:city,
            type:type
        });
        restaurantDao.create(restaurant,function(err){
            if (err) console.log("注册失败!");
        });
        res.json(restaurant);
    });
};
//修改餐厅基本信息
restManagerHandler.modifyRestInfo = function(req,res){
    req.setEncoding('utf-8');
    var postData="";
    req.addListener("data",function(postDataChunk){
        postData += postDataChunk;
    });
    req.addListener("end",function(){
        var params = JSON.parse(postData);
        var restId = params.restId;
        var restName = params.restName;
        var restAddress = params.address;
        var restPicture = params.picture;
        var restContact = params.contact;
        var restCity = params.city;
        var restType = params.type;
        var condition ={_id:restId};
        var update = {
        "$set": {
            restName: restName,
            address: restAddress,
            picture: restPicture,
            contact: restContact,
            city: restCity,
            type: restType
            }
        };

        restaurantDao.updateRestaurantInfo(condition,update,null,function(error){
            if(error){
                res.json({message:'修改餐馆信息失败！'});
            }
        });
        //将该餐馆信息返回给客户端
        restaurantDao.findRestaurantById(restId,function(error,restaurant){
            if(error)
            {
                console.log(error);
            }else
            {
                res.json(restaurant);
            }
        });
    });
};
//浏览餐馆基本信息
restManagerHandler.viewRestInfo = function(req,res){
    req.setEncoding('utf-8');
    var postData="";
    req.addListener("data",function(postDataChunk){
        postData += postDataChunk;
    });
    req.addListener("end",function(){
        var params = JSON.parse(postData);
        var restId = params.restId;
        console.log("查看的餐厅ID:"+restId);
        restaurantDao.findRestaurantById(restId,function(error,restaurant){
            if(error)
            {
                console.log(error);
            }else
            {
                res.json(restaurant);
            }
        });
    });
};

module.exports = restManagerHandler;