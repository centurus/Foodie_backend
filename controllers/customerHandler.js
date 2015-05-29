/**
 * Created by 紫洋 on 2015/4/12.
 */
var customerDao = require('../dao/customerDao');
var Customer = require('../models/customer');
var querystring = require('querystring');

function customerHandler() {

}

//顾客注册
customerHandler.regist = function (req, res) {
    req.setEncoding('utf-8');
    var postData = "";
    //以下是接收客户端传来的信息的处理，暂时还无法验证
    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
        console.log(postData);
    });
    //数据接收完毕之后
    req.addListener("end", function () {
        console.log('数据接收完' + postData);
        //将JSON数据转化成js的字符串
        var params = JSON.parse(postData);
        console.log("params: " + params);
        var customerName = params.customerName;
        var customerPass = params.customerPass;
        var phone = params.phone;
        var address = params.address;
        console.log("注册---用户名:" + customerName + "-----密码:" + customerPass);

        var customer = new Customer({
            customerName: customerName,
            customerPass: customerPass,
            phone: phone,
            address: address
        });

        customerDao.add(customer, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
        });
        res.json({message: 'customer add successfully!'});
    });
};

//已注册用户登录
customerHandler.login = function (req, res) {
    req.setEncoding('utf-8');

    var postData = "";
    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });

    req.addListener("end", function () {
        console.log("数据接收完");
        var params = JSON.parse(postData);
        var customerName = params.customerName;
        var customerPass = params.customerPass;
        console.log("登录——用户名：" + customerName + " 密码：" + customerPass);

        customerDao.findByNameAndPass(customerName, customerPass, function (err, customer) {
            if (err) {
                console.log(err);
                res.json(err);
            }
            else {
                res.json(JSON.stringify(customer)); // 成功登陆，返回包含用户信息的JSON，注意这里的JSON.stringfy
            }
        });
    });
};

//用户修改个人信息
customerHandler.modifyInfo = function (req, res) {
    req.setEncoding("utf-8");
    var postData = "";
    req.addListener("data", function(postDataChunk) {
        postData += postDataChunk;
    });
    req.addListener("end", function() {
        var params = JSON.parse(postData);
        var customerId = params.customerId;
        var customerName = params.customerName;

        var phone = params.phone;
        var address = params.address;
        var condition={_id:customerId};
        console.log("要修改的用户ID："+restId);
        var update = {
            $set:{
            customerName:customerName,
            phone:phone,
            address:address
            }
        };
        customerDao.update(condition,update,null,function(error,message){
            if (error) return res.json(error);
            return res.json(message);
        });
    });
};

//查看个人信息
customerHandler.viewInfo = function (req, res) {
    req.setEncoding("utf-8");
    var postData ="";
    req.addListener("data",function(postDataChunk){
        postData += postDataChunk;
    });
    req.addListener("end",function(){
        var params = JSON.parse(postData);
        var customerId = params.customerId;
        console.log("查看个人信息handler---user_id：" + customerId);
        customerDao.getCustomerById(customerId, function (err, customer) {
            if (err) {
                console.log(err);
            } else {
                res.json(customer);
            }
        });
    });
};

// 用户签到
// 接收POST请求，参数名：id（表示用户ID）、rest_id（表示餐馆ID）、content（表示签到内容）
customerHandler.addCheck_in = function (req, res) {
    req.setEncoding("utf-8");
    var postData = "";
    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });

    req.addListener("end", function () {
        //将JSON数据转化成js的字符串
        var params = JSON.parse(postData);

        var id = params.id;
        var rest_id = params.rest_id;
        var content = params.content;

        var condition = {_id: id};
        var check_in = {
            rest_id: rest_id,
            content: content,
            time: new Date()
        };
        var update = {
            $push: {
                check_in: check_in
            }
        };

        customerDao.update(condition, update,null, function (err, message) {
            if (err)
                console.log("Error: " + err);
            else
                console.log("Message: " + message);
        });
    });

    res.json({message: "check in added"});
};

// 用户删除签到
// 接收JSON格式的POST请求，参数名：id（表示用户ID）、check_in_id（表示签到ID）
// 返回操作结果：成功返回{message: "check in added"}，失败返回{error: err}
customerHandler.removeMyCheckIn = function(req, res) {
    req.setEncoding('utf-8');

    var postData = "";
    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });

    req.addListener("end", function () {
        //将JSON数据转化成js的字符串
        var params = JSON.parse(postData);

        var id = params.id;
        var check_in_id = parmas.check_in_id;

        var condition = {_id: id};
        var update = {
            "$pull": {
                check_in: {
                    _id: check_in_id
                }
            }
        };
        customerDao.update(condition, update, null, function(err, message) {
            if (err) {
                console.log("Error: " + err);
                res.json(403, {error: err});
            }
            else {
                console.log("Message: " + message);
                res.json({message:'签到删除成功！'});
            }
        });
    });
};

// 显示指定用户的所有签到信息
// 接收JSON格式的POST请求，参数名：id（标识用户ID）
// 返回JSON格式的签到信息数组
customerHandler.viewAllMyCheckIn = function(req, res) {
    req.setEncoding('utf-8');

    var postData = "";
    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });

    req.addListener("end", function () {
        //将JSON数据转化成js的字符串
        var params = JSON.parse(postData);
        var id = params.id;
        console.log("查询用户签到的用户ID为："+id);
        customerDao.getCustomerCheckIn(id, function (error, check_in) {
            if (error) {
                console.log("Error: " + error);
                res.json(403, {error: error});
            }
            else {
                console.log("Check in: " + check_in);
                res.json(check_in);
            }
        });
    });
};

module.exports = customerHandler;
