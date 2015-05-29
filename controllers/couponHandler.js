/**
 * Created by 紫洋 on 2015/4/20.
 */

var Restaurant = require('../models/restaurant');
var restaurantDao = require('../dao/restaurantDao');
//var queryString = require('querystring');
function couponHandler(){

}

//添加优惠券
couponHandler.create = function (req,res) {
    req.setEncoding('utf-8');
    var postData="";
    req.addListener("data",function(postDataChunk){
        postData += postDataChunk;
    });
    req.addListener("end",function(){
        console.log("优惠券信息接收完毕！");
        var params = JSON.parse(postData);
        var restId = params.restId;
        var description = params.description;
        var endTime = params.endTime;
        console.log("RestaurantId:"+restId);
        var conditions = {_id:restId};
        var update ={
            "$push":{coupon:{
                description:description,
                endTime:endTime
            }}};
        //更新该餐馆的优惠券信息
        restaurantDao.updateRestaurantInfo(conditions,update,null,function(error){
            if (error) {
                res.json({message:'优惠券添加失败！'});
            }
            else{
                res.json({message:'优惠券添加成功！'});
            }
        });
    });
};

//查看所有优惠券
couponHandler.viewAllCoupon = function(req,res){
    req.setEncoding('utf-8');
    var postData = "";
    req.addListener("data",function(postDataChunk){
        postData += postDataChunk;
    });
    req.addListener("end",function() {
        var params = JSON.parse(postData);
        var restId = params.restId;
        restaurantDao.findAllCouponById(restId, function (err, coupon) {
            if (err) {
                console.log(err);
            } else {
                res.json(coupon);
            }
        });
    });
};

//查看一个优惠券的信息
couponHandler.viewOneCoupon = function(req,res){
    req.setEncoding('utf-8');
    var postData = "";
    req.addListener("data",function(postDataChunk){
        postData += postDataChunk;
    });
    req.addListener("end",function() {
        var params = JSON.parse(postData);
        var restId = params.restId;
        var couponId = params.couponId;
        console.log("查看的优惠券ID为："+couponId);
        var condition ={
            _id:restId,
            coupon:{$elemMatch:
            {_id:couponId}
            }};

        restaurantDao.findOneCoupon(condition, function (err, coupon) {
            if (err) {
                console.log(err);
            } else {
                res.json(coupon);
            }
        });
    });
};

//更改优惠券
couponHandler.modifyCoupon =function(req,res){
    req.setEncoding('utf-8');
    var postData = "";
    req.addListener("data",function(postDataChunk){
        postData += postDataChunk;
    });
    req.addListener("end",function(){
        var params = JSON.parse(postData);
        var restId = params.restId;
        var couponId = params.couponId;
        var description = params.description;
        var endTime = params.endTime;
        console.log("RestaurantId:"+restId);
        console.log("修改的优惠券ID为："+couponId);
        var condition = {
            _id: restId,
            coupon: {$elemMatch: {_id: couponId}}
        };
        var update = {
            "$set": {
                "coupon.$":{
                    description: description,
                    endTime: endTime
                }
            }
        };
        restaurantDao.updateRestaurantInfo(condition,update,null,function(error,message){
            if (error) {
                res.json({message:'修改优惠券失败！'});
            }
            else{
                res.json({message:'修改优惠券成功！'});
            }
        });
    });
};

//删除优惠券
couponHandler.deleteCoupon = function(req,res){
    req.setEncoding('utf-8');
    var postData = "";
    req.addListener("data",function(postDataChunk){
        postData += postDataChunk;
    });
    req.addListener("end",function(){
        var params = JSON.parse(postData);
        var restId = params.restId;
        var couponId = params.couponId;
        console.log("删除的优惠券ID是："+couponId);
        var condition = {
            _id:restId
        };
        var update = {
            "$pull": {
                coupon:
                { description:couponId}

            }
        };
        restaurantDao.updateRestaurantInfo(condition,update,null,function(error,message){
            if (error) {
                res.json({message:'删除优惠券失败！'});
            }
            else{
                res.json({message:'删除优惠券成功！'});
            }
        });
    });
};

module.exports = couponHandler;
