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
        password : req.body.password,
        time: 123,
        realName: 'asdasd',
        asd: 1312,
        userId: 'userId'
    });
    console.log(newAccount);
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
	//console.log(req.body);
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
// 获取项目列表
router.get('/api/project/getProject',(req,res) => {
	//console.log(req.body);
	var model = req.body
	//console.log(res);
    // 通过模型去查找数据库
    models.projects.find({},(err,data) => {
        if (err) {
            res.json(err);
            console.log(err);
        } else {
        	if(!!data){
        		//console.log(data);
        		res.json(data);
        	}else{
        		res.json('none');
        	}
        }
    });
});
// 创建项目
router.post('/api/project/createProject',(req,res) => {
	let newProject = new models.projects({
        projectName : req.body.projectName,
        describe : req.body.describe,
        time: 0,
    });
    console.log(newProject);
    // 保存数据newAccount数据进mongoDB
    newProject.save((err,data) => {
        if (err) {
            res.json(err);
        } else {
            res.json(newProject);
        }
    });
});
// 删除项目
router.delete('/api/project/delProject/:_id',(req,res) => {
    let delProject = new models.projects({
        _id : req.params._id
    });
    console.log(req.params);
    models.projects.remove(delProject, error=>{  
	    if (error) {  
	        console.error(error);  
	    } else {  
	    	res.json('删除成功');
	        //console.error("删除成功")  
	    }  
	}); 
});
// 更新项目
router.put('/api/project/changeProject',(req,res) => {
	let changeProject = new models.projects({
		_id : req.body._id
    });
    console.log(changeProject);
    console.log({
		projectName : req.body.projectName,
        describe : req.body.describe
	});
	models.projects.update(changeProject, {$set:{
		projectName : req.body.projectName,
        describe : req.body.describe
	}}, error=> {  
	    if (error) {  
	        console.error(error);  
	    } else {  
	        res.json('更新成功');
	    }  
	});  
});

//查询用户列表
router.get('/api/user/getUserList',(req,res) => {
    // 通过模型去查找数据库
    models.members.distinct('account',(err,data) => {
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
//查询部门列表
router.get('/api/project/getDepartment',(req,res) => {
	//console.log(req.body);
	var model = req.body
	//console.log(model);
    // 通过模型去查找数据库
    models.projectInfos.distinct('departmentName',(err,data) => {
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
// 创建部门
router.post('/api/project/createDepartment',(req,res) => {
	let newProject = new models.projectInfos({
        departmentName : req.body.departmentName,
        projectFirstName : req.body.projectFirstName,
        projectSecondName: req.body.projectSecondName,
    });
    console.log(newProject);
    // 保存数据newAccount数据进mongoDB
    newProject.save((err,data) => {
        if (err) {
            res.json(err);
        } else {
            res.json(newProject);
        }
    });
});
//查询部门对应下的一级项目
router.get('/api/project/getProjectFirst',(req,res) => {
    let department = req.query.department;
    // 通过模型去查找数据库
    models.projectInfos.distinct('projectFirstName',{
    	departmentName:department,
    	projectFirstName:{
    		$ne:''
    	}
    },(err,data) => {
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
//查询部门和一级项目对应下的二级项目
router.get('/api/project/getProjectSecond',(req,res) => {
    let department = req.query.department;
    let projectFirstName = req.query.projectFirstName;
    let query={};
    if(req.query.department&&req.query.projectFirstName){
    	query={
	    	departmentName:department,
	    	projectFirstName:projectFirstName,
	    	projectSecondName:{
	    		$ne:''
	    	}
	    }
    }else{
    	query={
	    	projectSecondName:{
	    		$ne:''
	    	}
	    }
    }
    // 通过模型去查找数据库
    models.projectInfos.distinct('projectSecondName',query,(err,data) => {
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
// 创建工时
router.post('/api/project/createWorkLog',(req,res) => {
	let newWorkLog = new models.workLogs({
        member: req.body.member,
        projectInfo: req.body.projectInfo,
        dateRange: req.body.dateRange,
        workDays: req.body.workDays,
    });
    console.log(newWorkLog);
    // 保存数据newWorkLog数据进mongoDB
    newWorkLog.save((err,data) => {
        if (err) {
            res.json(err);
        } else {
            res.json(newWorkLog);
        }
    });
});
//查询项目部门对应关系列表
router.get('/api/project/departmentList',(req,res) => {
	let departmentList=[];
	let count=0;
	let countS=0;
	let mark=true;
    // 通过模型去查找数据库
    models.projectInfos.distinct('departmentName',(err,data) => {
        if (err) {
            res.json(err);
        } else {
        	if(!!data){
        		data.forEach(item=>{
        			departmentList.push({
        				departmentName:item,
        				childProjects:[]
        			})
        		});
        		departmentList.forEach(item=>{
        			models.projectInfos.distinct('projectFirstName',{
				    	departmentName:item.departmentName,
				    	projectFirstName:{
				    		$ne:''
				    	}
				    },(err,data) => {
				        if (err) {
				            res.json(err);
				            console.log(err);
				        } else {
				        	if(!!data){
				        		data.forEach(items=>{
				        			item.childProjects.push({
				        				projectFirstName:items,
				        				childProjects:[]
				        			})
				        		});
				        		item.childProjects.forEach(items=>{
				        			models.projectInfos.distinct('projectSecondName',{
								    	departmentName:item.departmentName,
								    	projectFirstName:items.projectFirstName,
								    	projectSecondName:{
								    		$ne:''
								    	}
								    },(err,data) => {
								        if (err) {
								            res.json(err);
								            console.log(err);
								        } else {
								        	if(!!data){
								        		data.forEach(itemss=>{
								        			items.childProjects.push({
								        				projectSecondName:itemss,
								        			})
								        		});
								        		count++;
								        		function test(){
													setTimeout(()=>{
									        			if(count==countS&&mark){
									        				res.json(departmentList);
									        				mark=false;
									        			}else{
									        				countS=count;
									        				test();
									        			}
								        			},10);
												}
								        		test();
								        	}else{
								        		res.json('none');
								        	}
								        }
								    });
				        		});
				        	}else{
				        		res.json('none');
				        	}
				        }
				    });
        		});
        	}else{
        		res.json('none');
        	}
        }
    });
});
//查询项目工时列表
router.get('/api/project/workLogList',(req,res) => {
	
    // 通过模型去查找数据库
    models.workLogs.find({},(err,data) => {
        if (err) {
            res.json(err);
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