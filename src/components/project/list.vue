<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>项目管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-form :model="form" 
             label-width="80px" 
             :rules="rules"
             ref="form"
             style="margin-top:60px;">
      <el-form-item label="部门" prop="departmentName">
        <el-select
	      v-model="form.departmentName"
	      filterable
	      @change="handleChange"
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
	      @change="handleChange"
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
	      @change="handleChange"
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
    </el-form>
    <el-button type="primary" @click="makeSure">确 定</el-button>
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
      handleChange(){
        //获取一级项目
        this.getProjectFirst();
      },
      makeSure(){
        this.$refs.form.validate((valid) => {
          if (valid) {
            let para = Object.assign({}, this.form);
	        this.$http.post('/api/project/createDepartment', para).then((data) => {
	          let datas=data.data;
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
        this.$http.get('/api/project/getProjectFirst?department='+departmentName).then((data) => {
          let datas=data.data;
          this.projectFirstList=[];
          datas.forEach(item=>{
            this.projectFirstList.push({
              value:item,
              label:item,
            });
          });
    	});
      },
      getDepartment(){
        this.$http.get('/api/project/getDepartment').then((data) => {
          let datas=data.data;
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

<style scoped>
.el-select{
  float:left;
}
</style>
