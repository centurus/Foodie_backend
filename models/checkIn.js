/**
 * Created by 紫洋 on 2015/4/19.
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var checkInSchema = new Schema({
    rest_id:ObjectId,
    content:String,
    time:Date
});

module.exports = checkInSchema;
