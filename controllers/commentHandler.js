/**
 * Created by 紫洋 on 2015/4/20.
 */
var Restaurant = require('../models/restaurant');
var restaurantDao = require('../dao/restaurantDao');
//var queryString = require('querystring');
function commentHandler(){

}
//发表评论
commentHandler.create = function (req,res) {
    req.setEncoding('utf-8');
    var postData="";
    req.addListener("data",function(postDataChunk){
        postData += postDataChunk;
    });
    req.addListener("end",function(){
        console.log("评论信息接收完毕！");
        var params = JSON.parse(postData);
        var restId = params.restId;
        var customerId = params.customerId;
        var content = params.content;
        var rating = params.rating;
        console.log("RestaurantId:"+restId);
        console.log("用户ID："+customerId);
        var conditions = {_id:restId};
        var update ={
            "$push":{comment:{
                customerId:customerId,
                content:content,
                rating:rating
            }}};
        //更新该餐馆的评论信息
        restaurantDao.updateRestaurantInfo(conditions,update,null,function(error){
            if (error) {
                res.json({message:'评论失败！'});
            }
            else{
                res.json({message:'评论成功！'});
            }
        });
    });
}
//查看所有评论
commentHandler.viewAllComment = function(req,res){
    req.setEncoding('utf-8');
    var postData = "";
    req.addListener("data",function(postDataChunk){
        postData += postDataChunk;
    });
    req.addListener("end",function() {
        var params = JSON.parse(postData);
        var restId = params.restId;
        restaurantDao.findRestaurantCommentById(restId, function (err, comment) {
            if (err) {
                console.log(err);
            } else {
                res.json(comment);
            }
        });
    });
}
//查看单条评论
commentHandler.viewOneComment =function(req,res){
    req.setEncoding('utf-8');
    var postData = "";
    req.addListener("data",function(postDataChunk){
        postData += postDataChunk;
    });
    req.addListener("end",function() {
        var params = JSON.parse(postData);
        var restId = params.restId;
        var commentId = params.commentId;
        console.log("查看的评论ID为："+commentId);
        var condition ={
            _id:restId,
            comment:{$elemMatch:
            {_id:commentId}
            }};
        restaurantDao.findOneComment(condition, function (err, food) {
            if (err) {
                // console.log(err);
            } else {
                res.json(food);
            }
        });
    });
}

//更改评论
commentHandler.modifyComment =function(req,res){
    req.setEncoding('utf-8');
    var postData = "";
    req.addListener("data",function(postDataChunk){
        postData += postDataChunk;
    });
    req.addListener("end",function(){
        var params = JSON.parse(postData);
        var restId = params.restId;
        var commentId =params.commentId;
        var customerId = params.customerId;
        var content = params.content;
        var rating = params.rating;

        console.log("RestaurantId:"+restId);
        console.log("修改的评论ID为："+commentId);
        var condition = {
            _id: restId,
            comment: {$elemMatch: {_id: commentId}}
        };
        var update = {
            "$set": {
                "comment.$.customerId": customerId,
                "comment.$.content": content,
                "comment.$.rating": rating,
                "comment.$.commentTime": Date.now()
            }
        };

        restaurantDao.updateRestaurantInfo(condition,update,null,function(error,message){
            if (error) {
                res.json({message:'修改评论失败！'});
            }
            else{
                res.json({message:'修改评论成功！'});
            }
        });
    });
};

//删除评论
commentHandler.deleteComment = function(req,res){
    req.setEncoding('utf-8');
    var postData = "";
    req.addListener("data",function(postDataChunk){
        postData += postDataChunk;
    });
    req.addListener("end",function(){
        var params = JSON.parse(postData);
        var restId = params.restId;
        var commentId = params.commentId;
        console.log("删除的评论的ID是："+commentId);
        var condition = {
            _id:restId
        };

        var update = {
            "$pull": {
                comment:
                { _id:commentId}
            }
        };
        restaurantDao.updateRestaurantInfo(condition,update,null,function(error,message){
            if (error) {
                res.json({message:'删除评论失败！'});
            }
            else{
                res.json({message:'删除评论成功！'});
            }
        });
    });
}

module.exports = commentHandler;