<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>部门产品管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-card class="box-card">
      <el-col :span="18" :offset="3">
        <el-form :model="form" 
              label-width="80px" 
              :rules="rules"
              class="ruleForm"
              ref="form">
          <el-form-item label="部门" prop="departmentName">
            <el-select
            v-model="form.departmentName"
            filterable
            @change="handleChange('department')"
            allow-create
            placeholder="请选择部门">
            <el-option
              v-for="item in departmentList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="一级项目">
            <el-select
            v-model="form.projectFirstName"
            filterable
            @change="handleChange('projectFirst')"
            allow-create
            placeholder="请选择一级项目">
            <el-option
              v-for="item in projectFirstList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="二级项目">
            <el-select
            v-model="form.projectSecondName"
            filterable
            allow-create
            placeholder="请选择二级项目">
            <el-option
              v-for="item in projectSecondList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="makeSure">确 定</el-button>
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
        departmentList: [],
        projectFirstList: [],
        projectSecondList: [],
        form:{
          departmentName:'',
          projectFirstName:'',
          projectSecondName:'',
        },
        rules:{
          departmentName: [
            { required: true, message: '请选择部门', trigger: 'change' }
          ]
        },
      }
    },
    methods: {
      handleChange(val){
        if(val=='department'){
          //获取一级项目
          this.getProjectFirst();
        }else if(val=='projectFirst'){
          this.getProjectSecond();
        }
      },
      makeSure(){
        this.$refs.form.validate((valid) => {
          if (valid) {
            let para = Object.assign({}, this.form);
  	        this.$http.post('/api/department/createDepartment', para).then((data) => {
  	          let datas=data.data.data;
  	          console.log(datas);
  	    	  });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getProjectFirst(){
        let departmentName=this.form.departmentName;
        this.$http.get('/api/department/getProjectFirst?department='+departmentName).then((data) => {
          let datas=data.data.data;
          this.projectFirstList=[];
          datas.forEach(item=>{
            this.projectFirstList.push({
              value:item,
              label:item,
            });
          });
    	  });
      },
      getProjectSecond(){
        let departmentName=this.form.departmentName;
        let projectFirstName=this.form.projectFirstName;
        this.$http.get('/api/department/getProjectSecond?department='+departmentName+'&projectFirstName='+projectFirstName).then((data) => {
          let datas=data.data.data;
          this.projectSecondList=[];
          datas.forEach(item=>{
            this.projectSecondList.push({
              value:item,
              label:item,
            });
          });
    	});
      },
      getDepartment(){
        this.$http.get('/api/department/getDepartment').then((data) => {
          let datas=data.data.data;
          datas.forEach(item=>{
            this.departmentList.push({
              value:item,
              label:item,
            });
          });
    	});
      },
    },
    mounted() {
      this.getDepartment();
    }
  }
</script>

<style scoped lang="scss">

</style>
