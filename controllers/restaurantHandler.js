/**
 * Created by 紫洋 on 2015/5/17.
 */
var Restaurant = require('../models/restaurant');
var restaurantDao = require('../dao/restaurantDao');

function restaurantHandler(){

}

//浏览所有餐厅的基本信息
restaurantHandler.viewInfo=function(req,res){
    req.setEncoding('utf-8');
    var postData="";
    req.addListener("data",function(postDataChunk){
        postData += postDataChunk;
    });
    req.addListener("end",function(){
        console.log('数据接收完毕');
        restaurantDao.getAllRestaurant(function(error,restaurants){
            if(error) {
                console.log(error);
            }else{
                res.json(restaurants);
            }
        });

    });

};

module.exports = restaurantHandler;