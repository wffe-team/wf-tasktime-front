<template>
  <el-row>
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>项目管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    
    <el-col :span="24" style="margin-top:20px;">
      <el-date-picker
	    v-model="searchData.time"
	    type="month"
	    placeholder="选择月">
	  </el-date-picker>
	  <el-button type="primary" @click="getWorkLogList(searchData)">查询</el-button>
    </el-col>
    <el-col :span="20" :offset="2" style="margin-top:20px;">
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
	      prop="type"
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
		        <template scope="scope">
		          <span v-show="itemss.projectSecondName==scope.row.projectInfo">{{scope.row.workDays}}</span>
		        </template>
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
        searchData:{
          time:'',
        },
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
      getWorkLogList(searchData){
        let para = Object.assign({}, this.searchData);
        let options = {
            params: para
        };
        this.$http.get('/api/project/workLogList',options).then((data) => {
          let datas=data.data;
          this.workLogList=datas;
    	});
      },
      getCurrentDate(){
        let currentDate=new Date();
        let currentMonthStr=currentDate.getFullYear()+'-'+(currentDate.getMonth()+1);
        currentDate=new Date(currentMonthStr);
        this.searchData.time=currentDate;
        this.getWorkLogList(this.searchData);
      }
    },
    mounted() {
      this.getDepartmentList();
      this.getCurrentDate();
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
