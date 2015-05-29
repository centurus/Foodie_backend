/**
 * Created by 紫洋 on 2015/4/19.
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema
//var ObjectId = mongoose.Schema.Types.ObjectId;

var couponSchema = new Schema({
    description:String,
    startTime:{type:Date,default:Date.now()},
    endTime:Date
});

module.exports = couponSchema;
