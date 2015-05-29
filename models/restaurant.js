/**
 * Created by 紫洋 on 2015/4/5.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var foodSchema = require('./food');
var commentSchema = require('./comment');
var couponSchema = require('./coupon');

var restaurantSchema = new Schema({
    restName:String,
    restManagerName:String,
    restManagerPass:String,
    address:String,
    picture:String,
    longitude:String,
    latitude:String,
    contact:String,
    city:String,
    averageRating:Number,//餐馆评价等级
    type:String,//餐馆类别
    checkInCount: {type: Number, default: 0},//该餐馆的签到总数
    food:[foodSchema],
    comment:[commentSchema],
    coupon:[couponSchema]
});

module.exports=mongoose.model('Restaurant',restaurantSchema);