/**
 * Created by 紫洋 on 2015/4/4.
 */
var checkInSchema = require('./checkIn');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new Schema({
    customerName:{type:String,unique:true},
    customerPass:{type:String},
    phone:{type:String,unique:true},
    address:String,
    regTime:{type:Date,default:Date.now()},
    check_in:[checkInSchema]
});

module.exports=mongoose.model('Customer',customerSchema);
