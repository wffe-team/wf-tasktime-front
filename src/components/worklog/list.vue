<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>项目管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    
    <el-col>
      <el-table
	    :data="workLogList"
	    border
	    style="width: 100%">
	    <el-table-column
	      prop="member"
	      label="人员"
	      width="50">
	    </el-table-column>
	    <el-table-column
	      prop=""
	      label="类型"
	      width="50">
	    </el-table-column>
	    <el-table-column v-for="item in departmentList" :label="item.departmentName">
	      <el-table-column
	        v-for="items in item.childProjects"
	        :label="items.projectFirstName">
	          <el-table-column
		        v-for="itemss in items.childProjects"
		        prop=""
		        :label="itemss.projectSecondName">
		      </el-table-column>
	      </el-table-column>
	    </el-table-column>
	  </el-table>
    </el-col>
  </el-row>
</template>

<script>

  export default {
    data() {
      return {
        departmentList:[],
        workLogList:[],
        tableData3: [{
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
      }
    },
    methods: {
      getDepartmentList(){
        this.$http.get('/api/project/departmentList').then((data) => {
          let datas=data.data;
          this.departmentList=datas;
    	});
      },
      getWorkLogList(){
        this.$http.get('/api/project/workLogList').then((data) => {
          let datas=data.data;
          this.workLogList=datas;
    	});
      }
    },
    mounted() {
      this.getDepartmentList();
      this.getWorkLogList();
    }
  }
</script>

<style scoped>
.el-select{
  float:left;
}
.tab {
    width: 99.99%;
    border-collapse: collapse;
    text-align: center;
}
.tab thead tr th {
    text-align: left;
    padding-left: 20px;
}
.tab tr {
    height: 46px;
}
.tab th,.tab td {
    position: relative;
    border: #DBDBDB solid 1px;
}
.tab th {
    background-color: #EBEBEB;
}
</style>
