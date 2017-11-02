<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>个人工时记录</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="12" style="margin-top:20px;">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		  <el-form-item label="项目" prop="projectInfo">
		    <el-select
		      v-model="ruleForm.projectInfo"
		      filterable
		      placeholder="请选择项目">
		      <el-option
		        v-for="item in projectList"
		        :key="item.value"
		        :label="item.label"
		        :value="item.value">
		      </el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="日期" prop="dateRange">
		  	<el-date-picker
		      v-model.array="ruleForm.dateRange"
		      type="daterange"
		      :clearable="false"
		      placeholder="选择日期范围">
		    </el-date-picker>
		  </el-form-item>
		  <el-form-item label="人员" prop="member">
		    <el-select
		      v-model="ruleForm.member"
		      filterable
		      placeholder="请选择人员">
		      <el-option
		        v-for="item in userList"
		        :key="item.value"
		        :label="item.label"
		        :value="item.value">
		      </el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="人员类型" prop="type">
		    <el-select
		      v-model="ruleForm.type"
		      filterable
		      placeholder="请选择类型">
		      <el-option
		        key="正编"
		        label="正编"
		        value="正编">
		      </el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="工时(天)" prop="workDays">
		    <el-input v-model.number="ruleForm.workDays" placeholder="请输入工时"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
		    <el-button @click="resetForm('ruleForm')">重置</el-button>
		  </el-form-item>
		</el-form>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          projectInfo: '',
          dateRange:[],
          member:'',
          workDays:'',
          type:'',
        },
        rules: {
          projectInfo: [
            { required: true, message: '请选择项目名称', trigger: 'blur' },
          ],
          dateRange: [
            { required: true,type: 'array', message: '请填写时间', trigger: 'blur' },
          ],
          member: [
            { required: true, message: '请选择人员', trigger: 'blur' },
          ],
          workDays:[
	        { required: true, type: 'number', message: '请填写纯数字工时', trigger: 'blur'},
	      ]
        },
        projectList:[],
        userList:[],
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let para = Object.assign({}, this.ruleForm);
            this.$http.post('/api/project/createWorkLog', para).then((data) => {
	          let datas=data.data;
	          console.log(datas);
	    	});
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      getProjectList(){
        this.$http.get('/api/project/getProjectSecond').then((data) => {
          let datas=data.data;
          datas.forEach(item=>{
            this.projectList.push({
              value:item,
              label:item,
            });
          });
    	});
      },
      getUserList(){
        this.$http.get('/api/user/getUserList').then((data) => {
          let datas=data.data;
          datas.forEach(item=>{
            this.userList.push({
              value:item,
              label:item,
            });
          });
    	});
      }
    },
    mounted() {
      this.getProjectList();
      this.getUserList();
    }
  }
</script>

<style scoped>
.el-select,.el-input{
  float:left;
}
</style>
