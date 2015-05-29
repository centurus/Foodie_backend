/**
 * Created by ���� on 2015/5/17.
 */
var Restaurant = require('../models/restaurant');
var restaurantDao = require('../dao/restaurantDao');

function restaurantHandler(){

}

//������в����Ļ�����Ϣ
restaurantHandler.viewInfo=function(req,res){
    req.setEncoding('utf-8');
    var postData="";
    req.addListener("data",function(postDataChunk){
        postData += postDataChunk;
    });
    req.addListener("end",function(){
        console.log('���ݽ������');
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