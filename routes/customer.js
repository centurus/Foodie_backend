/**
 * Created by 紫洋 on 2015/4/4.
 */
var Customer = require('../models/customer');
var express = require('express');
var router = express.Router();
var customerHandler = require('../controllers/customerHandler');
var commentHandler = require('../controllers/commentHandler');
var restaurantHandler = require('../controllers/restaurantHandler');

//创建一个路由，当收到一个post请求时(/api/customers)请求内容也必须是json形式的,服务器将会把此customer添加
router.route('/customers/regist').post(customerHandler.regist);
//登录路由
router.route('/customers/login').post(customerHandler.login);
//创建一个路由，如果用户想更新他的用户信息，他会发送一个post请求(/api/customers/modify)，请求内容也是json形式的，服务器会将更新内容添加到数据库
router.route('/customers/modifyInfo').put(customerHandler.modifyInfo);
//用户信息浏览的路由
router.route('/customers/viewInfo').post(customerHandler.viewInfo);
//创建一个路由，如果收到一个请求(/api/customers/:id)，服务器将会删除该用户
router.route('/customers/delete').post(customerHandler);

//浏览所有餐厅基本信息
router.route('/customers/viewAllRestaurantsInfo').get(restaurantHandler.viewInfo);
//浏览单个餐厅的详细信息


//用户添加评论路由
router.route('/customers/addComment').put(commentHandler.create);
//查看所有评论路由
router.route('/customers/viewAllComment').post(commentHandler.viewAllComment);
//查看一条评论路由
router.route('/customers/viewOneComment').post(commentHandler.viewOneComment);
//修改一条评论
router.route('/customers/modifyComment').put(commentHandler.modifyComment);

//用户添加签到
router.route('/customers/addCheckIn').put(customerHandler.addCheck_in);
//用户浏览个人签到
router.route('/customers/viewAllMyCheckIn').put(customerHandler.viewAllMyCheckIn);
//用户删除签到
router.route('/customers/removeMyCheckIn').put(customerHandler.removeMyCheckIn);

module.exports = router;




