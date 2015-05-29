/**
 * Created by 紫洋 on 2015/4/8.
 */
var Customer = require('../models/customer');

var customerDao = new Customer();
//添加用户
customerDao.add = function(customer,callback){
        customer.save(function(error){
            if(error) return callback(error);
        });
};

//得到所有用户的信息
customerDao.getAllCustomers = function(callback){
        Customer.find({},function(error,customers){
            if (error) callback(error);
            if (!customers) {
                callback(null,"no customers");
            }
            callback(null,customers);
        });
};
//通过id来查询用户基本信息，不包括check_in
customerDao.getCustomerById = function(id,callback){
    Customer.findOne({_id:id},{check_in:0},function(error,customer){
        if (error)
            callback(error);
        else if (!customer)
            callback({error: "no such customer"});
        else
            callback(null, customer);
    });
};

// 通过id来查询用户所有的签到信息
customerDao.getCustomerCheckIn = function(id, callback) {
    Customer.findOne({_id: id}, {check_in: 1}).exec(function(err, check_in) {
        if (err) callback(err, null);
        else if (!customer)
            callback({error: "no such customer"});
        else
            callback(null, check_in); // 注意这里不能直接返回customer，因为其字段check_in中才是想要的数据 TODO 分页
    });
};

//更新用户的信息
customerDao.update = function(condition,update,options,callback){
    Customer.update(condition,update,options).exec(function(err,message){
        if (err) return callback(err,null);
        return callback(null,message);
    });
};

//通过用户id删除用户信息 注意：$in的使用
customerDao.deleteById = function(list,callback){
    Customer.remove({_id:{$in:list}}).exec(function(err,customer){
        if(error) return callback(error,null);
        return callback(null, customer);
    });
};
//通过用户名和密码查找该用户
customerDao.findByNameAndPass= function(customerName,customerPass,callback){
    Customer.findOne({customerName:customerName,customerPass:customerPass}).exec(function(error,customer){
        if(error)
            return callback(error,null);
        return callback(null, customer);
    });
};


module.exports = customerDao;


