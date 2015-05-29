/**
 * Created by 紫洋 on 2015/4/19.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var commentSchema = new Schema({
    customerId:ObjectId,
    content:String,
    commentTime:{type:Date,default:Date.now()},
    rating:Number
});

module.exports =commentSchema;
