"use strict";
const models = require('./db');
const express = require('express');
const router = express.Router();

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/

// 创建账号接口
router.post('/api/login/createAccount',(req,res) => {
    // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
    let newAccount = new models.members({
        account : req.body.account,
        password : req.body.password
    });
    // 保存数据newAccount数据进mongoDB
    newAccount.save((err,data) => {
        if (err) {
            res.json(err);
        } else {
            res.json(newAccount);
        }
    });
});
// 获取已有账号接口
router.post('/api/login/getAccount',(req,res) => {
	console.log(req.body);
	var model = req.body
	//console.log(res);
    // 通过模型去查找数据库
    models.members.findOne({ account: model.account,password: model.password },(err,data) => {
        if (err) {
            res.json(err);
            console.log(err);
        } else {
        	if(!!data){
        		console.log(data);
        		res.json(data);
        	}else{
        		res.json('none');
        	}
        }
    });
});

module.exports = router;