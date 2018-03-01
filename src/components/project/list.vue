<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator=">" class="navCss">
          <el-breadcrumb-item>部门产品管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="24">
      <el-card class="box-card">
        <el-tabs v-model="activeName">
          <el-tab-pane label="部门产品列表" name="first">
            <el-table
              :data="departmentProList"
              border
              v-loading="listLoading"
              style="width: 100%">
              <el-table-column
                prop=""
                label="序号"
                width="80">
                <template slot-scope="scope">
                  <span>{{scope.$index+1+(pageObj.currentPage-1)*pageObj.pageSize}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="departmentName"
                label="部门"
                width="180">
              </el-table-column>
              <el-table-column
                prop="projectFirstName"
                label="一级项目"
                width="180">
              </el-table-column>
              <el-table-column
                prop="projectSecondName"
                label="二级项目">
              </el-table-column>
              <el-table-column
                prop=""
                label="操作">
                <template slot-scope="scope">
                  <el-button size="small" @click="editRecord(scope.row)">编辑</el-button>
                  <el-button size="small" :loading="editLoading" @click="delRecord(scope.row)" type="danger">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination class="page"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageObj.currentPage"
              :page-sizes="[10, 20, 50]"
              :page-size="pageObj.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageObj.total">
            </el-pagination>
          </el-tab-pane>
          <el-tab-pane label="添加部门产品" name="second">
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
                <el-form-item label="一级项目" prop="projectFirstName">
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
                <el-form-item label="二级项目" prop="projectSecondName">
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
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>

  export default {
    data() {
      return {
        departmentList: [],
        projectFirstList: [],
        projectSecondList: [],
        departmentProList: [],
        form:{
          departmentName:'',
          projectFirstName:'',
          projectSecondName:'',
        },
        pageObj: {
          currentPage: 1,
          pageSize: 10,
          total: 101
        },
        rules: {
          departmentName: [
            { required: true, message: '请选择部门', trigger: 'change' }
          ]
        },
        activeName: 'first',
        listLoading: false,
        editLoading: false
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
  	          this.$message({
                  message: '操作成功',
                  type: 'success'
              });
              this.$refs['form'].resetFields();
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
      getDepartmentPro(){
        this.listLoading = true;
        let options = {
            params: this.pageObj
        };
        this.$http.get('/api/department/departmentProList',options).then((data) => {
          this.listLoading = false;
          let datas = data.data.data;
          this.pageObj.total = data.data.total;
          this.departmentProList = datas;
    	  });
      },
      editRecord(row){
        console.log(row);
      },
      delRecord(row){
        this.$confirm('确认删除该记录吗?', '提示', { type: 'warning' }).then(() => {
            this.editLoading = true;
            this.$http.delete('/api/department/deleteDepartment/' + row._id).then((data) => {
              this.editLoading = false;
              if (data) {
                  this.$message({
                      message: '删除成功',
                      type: 'success'
                  });
                  this.getDepartmentPro();
              }
            })
        })
      },
      handleSizeChange(val){
        this.pageObj.pageSize = val;
        this.pageObj.currentPage = 0;
      },
      handleCurrentChange(val){
        this.pageObj.currentPage = val;
        this.getDepartmentPro();
      }
    },
    mounted() {
      this.getDepartment();
      this.getDepartmentPro();
    }
  }
</script>

<style scoped lang="scss">
.page{
  float: right;
  margin-top: 20px;
}
</style>
