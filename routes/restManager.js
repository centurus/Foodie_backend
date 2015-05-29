/**
 * Created by 紫洋 on 2015/4/5.
 */
var express = require('express');
var router = express.Router();
var restManagerHandler = require('../controllers/restManagerHandler');
var foodHandler =require('../controllers/foodHandler');
var couponHandler = require('../controllers/couponHandler');

//路由指定
//餐厅信息注册
router.route('/restManager/reg').post(restManagerHandler.regist);
//修改餐厅信息
router.route('/restManager/modifyRestInfo').put(restManagerHandler.modifyRestInfo);
//查看餐厅信息
router.route('/restManager/viewRestInfo').post(restManagerHandler.viewRestInfo);


//添加美食
router.route('/restManager/addFood').put(foodHandler.addFood);
//修改美食信息
router.route('/restManager/modifyFood').put(foodHandler.modifyFoodInfo);
//浏览该餐馆的所有美食信息
router.route('/restManager/viewAllFood').get(foodHandler.viewAllFood);
//浏览该餐馆的一条美食信息
router.route('/restManager/viewOneFood').post(foodHandler.viewOneFood);
//删除美食
router.route('/restManager/deleteFood').put(foodHandler.deleteFood);

//添加优惠券
router.route('/restManager/addCoupon').put(couponHandler.create);
//浏览所有优惠券
router.route('/restManager/viewAllCoupon').post(couponHandler.viewAllCoupon);
//浏览一个优惠券
router.route('/restManager/viewOneCoupon').post(couponHandler.viewOneCoupon);
//修改单个优惠券信息
router.route('/restManager/modifyCoupon').put(couponHandler.modifyCoupon);
//删除单个优惠券
router.route('/restManager/deleteCoupon').post(couponHandler.deleteCoupon);


module.exports = router;
