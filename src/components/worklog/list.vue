<template>
  <el-row>
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>总工时统计表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-card class="box-card">
      <el-col :span="24" class="btnBox">
        <el-date-picker
            v-model="searchData.time"
            type="month"
            placeholder="选择月">
        </el-date-picker>
        <el-button type="primary" @click="getWorkLogList(searchData)">查询</el-button>
      </el-col>
      <el-col :span="24" class="tableBox">
        <el-table
          :data="workLogList"
          border
          style="width: 100%">
          <el-table-column
            prop="member"
            fixed
            label="人员"
            width="50">
          </el-table-column>
          <el-table-column
            prop="type"
            fixed
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
    </el-card>
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
      }
    },
    methods: {
      getDepartmentList(){
        this.$http.get('/api/department/departmentRelationList').then((data) => {
          let datas=data.data.data;
          this.departmentList=datas;
    	});
      },
      getWorkLogList(searchData){
        let para = Object.assign({}, this.searchData);
        let options = {
            params: para
        };
        this.$http.get('/api/worklog/getWorkLog',options).then((data) => {
          let datas=data.data.data;
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

<style scoped lang="scss">
.tableBox{
  margin-top: 20px;
}
.btnBox{
  text-align: left;
}
</style>
