<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator=">" class="navCss">
          <el-breadcrumb-item>个人工时记录</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-card class="box-card">
      <el-col :span="18" :offset="3">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
          <el-form-item label="项目" prop="projectInfo">
            <!-- <el-select
              v-model="ruleForm.projectInfo"
              filterable
              placeholder="请选择项目">
              <el-option
                v-for="item in projectList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select> -->

            <el-cascader
              v-model="ruleForm.projectInfo"
              :options="departmentList"
              :show-all-levels="false"
              @active-item-change="handleItemChange"
              :props="props"
            ></el-cascader>

          </el-form-item>
          <el-form-item label="日期" prop="dateRange">
            <el-date-picker
              v-model="ruleForm.dateRange"
              type="month"
              :clearable="false"
              placeholder="选择月">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="人员" prop="memberId">
            <el-select
              v-model="ruleForm.memberId"
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
              <el-option key="正编" label="正编" value="正编"></el-option>
              <el-option key="试用期" label="试用期" value="试用期"></el-option>
              <el-option key="外聘劳务" label="外聘劳务" value="外聘劳务"></el-option>
              <el-option key="实习" label="实习" value="实习"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工时(天)" prop="workDays">
            <el-input class="input" v-model.number="ruleForm.workDays" placeholder="请输入工时"></el-input>
          </el-form-item>
          <el-form-item label="任务说明" prop="remarks">
            <el-input type="textarea" class="input" v-model.number="ruleForm.remarks" placeholder="请输入任务说明"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-card>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          projectInfo: [],
          dateRange:'',
          member:'',
          memberId:'',
          workDays:'',
          type:'',
          remarks:'',
        },
        rules: {
          projectInfo: [
            { required: true, type: 'array', message: '请选择项目名称', trigger: 'blur' },
          ],
          dateRange: [
            { required: true, type: 'date', message: '请填写时间', trigger: 'blur' },
          ],
          member: [
            { required: true, message: '请选择人员', trigger: 'blur' },
          ],
          workDays:[
	          { required: true, type: 'number', message: '请填写纯数字工时', trigger: 'blur'},
	        ]
        },
        projectList:[],
        departmentList:[],
        projectFirstList:[],
        projectSecondList:[],
        userList:[],
        props: {
          value: 'label',
          children: 'children'
        }
      }
    },
    methods: {
      findIndex(list,val){
        let len=list.length;
        for(let i=0;i<len;i++){
          if(list[i].label==val){
            return i;
          }
        }
        return -1;
      },
      handleItemChange(val){
        if(val.length==1){
          this.$http.get('/api/department/getProjectFirst?department='+val[0]).then((data) => {
            let datas=data.data.data;
            this.projectFirstList=[];
            datas.forEach(item=>{
              this.projectFirstList.push({
                children:[],
                label:item,
              });
            });
            this.departmentList[this.findIndex(this.departmentList,val)].children=this.projectFirstList;
          });
        }else if(val.length==2){
          this.$http.get('/api/department/getProjectSecond?department='+val[0]+'&projectFirstName='+val[1]).then((data) => {
            let datas=data.data.data;
            this.projectSecondList=[];
            datas.forEach(item=>{
              this.projectSecondList.push({
                label:item,
              });
            });
            this.departmentList[this.findIndex(this.departmentList,val[0])].children[this.findIndex(this.projectFirstList,val[1])].children=this.projectSecondList;
          });
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let para = Object.assign({}, this.ruleForm);
            para.dateRange = para.dateRange && para.dateRange.toJSON();
            this.userList.forEach(item=>{
              item.value==para.memberId&&(para.member=item.label)
            });
            para.projectInfo=para.projectInfo.pop();
            console.log(para);
            this.$http.post('/api/worklog/createWorkLog', para).then((data) => {
    	        let datas=data.data.data;
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
      getDepartmentList(){
        this.$http.get('/api/department/getDepartment').then((data) => {
          let datas=data.data.data;
          datas.forEach(item=>{
            this.departmentList.push({
              children:[],
              label:item,
            });
          });
    	  });
      },
      getProjectList(){
        this.$http.get('/api/department/getProjectSecond').then((data) => {
          let datas=data.data.data;
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
          let datas=data.data.data;
          datas.forEach(item=>{
            this.userList.push({
              value:item.userId,
              label:item.account,
            });
          });
    	});
      }
    },
    mounted() {
      this.getProjectList();
      this.getUserList();
      this.getDepartmentList();
    }
  }
</script>

<style scoped lang="scss">

</style>
