// Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
const mongoose = require('mongoose');
// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connect('mongodb://localhost/test');

// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error',() => console.log('Mongo connection error'));
db.once('open',() => console.log('Mongo connection successed'));
/************** 定义模式loginSchema **************/

/**
 * 项目
 */
const projectSchema = new mongoose.Schema({
    projectId : String,
    projectName : String,
    time : Number,
    describe : String
});
/**
 *成员 
 */
const memberSchema = new mongoose.Schema({
	userId : String,
	account : String,
	password : String,
	realName : String,
	time : Number,
	projectIds : String
});
/**
 * 人天、工时
 */
var mandaySchema = new mongoose.Schema(
    {
        date: Date,
        userId: String,
        userName: String,
        projectId: String,
        time: Number,
        description: String
    }
);

/**
 * 工时记录
 */
var workLogSchema = new mongoose.Schema(
    {
        id: mongoose.Schema.Types.ObjectId,
        member: String,
        memberId: String,
        projectInfo: String,
        dateRange: '',
        workDays: Number,
        type:String       
    }
);

/**
 * 部门、产品
 */
var projectInfoSchema = new mongoose.Schema(
    {
        departmentName: String,
        projectFirstName: String,
        projectSecondName: String,
    }
);

/************** 定义模型Model **************/
const Models = {
    projectSchema: projectSchema,
    memberSchema: memberSchema,
    mandaySchema: mandaySchema,
    workLogSchema: workLogSchema,
    projectInfoSchema: projectInfoSchema,
    projects: mongoose.model("projects", projectSchema),
    members: mongoose.model("members", memberSchema),
    mandays: mongoose.model("mandays", mandaySchema),
    workLogs: mongoose.model("workLogs", workLogSchema),
    projectInfos: mongoose.model("projectInfos", projectInfoSchema),
};

module.exports = Models;