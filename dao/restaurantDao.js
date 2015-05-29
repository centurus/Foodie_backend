/**
 * Created by 紫洋 on 2015/4/12.
 */
var Restaurant = require("../models/restaurant");

var restaurantDao = new Restaurant();
//添加餐馆信息
restaurantDao.create = function(restaurant,callback){
    restaurant.save(function (error){
        if(error) return callback(error);
    });
}

////添加菜品，或者更新餐馆信息
//restaurantDao.addFoodInfo = function(restaurant,callback){
//    restaurant.food.push({
//         name:'1',
//         price:'12',
//         picture:'/',
//         tag:'sweet'
//    });
//    restaurant.save(function(error){
//        if (error) return callback(error);
//    })
//};


//更新餐馆信息
restaurantDao.updateRestaurantInfo = function(condition,update,options,callback){
    Restaurant.update(condition,update,options).exec(function(error,message){
        if (error) callback(error,null);
        return callback(null,message);
    });

};

// 查看所有餐馆的相关信息（餐馆名称，地址，图片，联系方式，所在城市）
restaurantDao.getAllRestaurant =function(callback){
    Restaurant.find({},{restName:1,address:1,picture:1,contact:1,city:1,type:1},function(error,restaurants){
        if (error) callback(error)
        //if (!restaurants) {
        //   return callback(null,"no restaurants");
        //}
        else{
            return callback(null,restaurants);
        }
    });
};

//查看单个餐馆基本信息
restaurantDao.findRestaurantById = function(id,callback){
    Restaurant.findOne({_id:id},{restName:1,address:1,picture:1,contact:1,city:1,type:1},function(error,restaurant){
        if (error) callback(error);
        return callback(null,restaurant);
    });
};

//查看某餐厅的所有美食信息
restaurantDao.findRestaurantFoodById = function(restId,callback){
    Restaurant.find({_id:restId},{food:1},function(err,foods){
        if (err) callback(err);
        return callback(null,foods);
    });
};
//查看某一餐馆的一条美食,"food.$"用来匹配查询到的数组项
restaurantDao.findOneFood = function(condition,callback){
    Restaurant.findOne(condition,{"food.$":1},function(error,food){
        if (error) callback(error);
        return callback(null,food);
    });
};

//查看某一餐厅的所有评论
restaurantDao.findRestaurantCommentById = function(restId,callback){
    Restaurant.find({_id:restId},{comment:1},function(err,comments){
        if (err) callback(err);
        return callback(null,comments);
    });
};
//查看某一餐厅的一个评论
restaurantDao.findOneComment = function(condition,callback){
    Restaurant.findOne(condition,{"comment.$":1},function(error,comment){
        if (error) callback(error);
        return callback(null,comment);
    });
};

//查看某一餐厅的所有优惠券
restaurantDao.findAllCouponById = function(restId,callback){
    Restaurant.find({_id:restId},{coupon:1},function(err,coupons){
        if (err) callback(err);
        return callback(null,coupons);
    });
};

//查看某一餐馆的一个优惠券
restaurantDao.findOneCoupon = function(condition,callback){
    Restaurant.findOne(condition,{"coupon.$":1},function(error,coupon){
        if (error) callback(error);
        return callback(null,coupon);
    });
};

//删除餐厅信息
restaurantDao.delete = function(id,callback){

};

module.exports = restaurantDao;