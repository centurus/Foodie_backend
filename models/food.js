/**
 * Created by 紫洋 on 2015/4/17.
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var foodSchema = new Schema({
    name:String,
    price:String,
    picture:String,
    type:String
});

module.exports = foodSchema;