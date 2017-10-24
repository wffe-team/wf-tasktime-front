<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>项目列表</b></el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="24">
  <el-button type="primary" @click="showAddProject">添加项目</el-button>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="projectName"
        label="项目名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop=""
        label="描述"
        width="180">
        <template scope="scope">
         {{scope.row.describe}}
         <el-button type="text" @click="showChangeProject(scope.row)">修改备注</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="time"
        label="总时长">
      </el-table-column>
      <el-table-column
        prop=""
        label="操作">
        <template scope="scope">
        <el-button type="danger" @click="delProject(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <el-dialog title="添加项目" :visible.sync="dialogFormVisible">
  <el-form :model="addProjectForm">
    <el-form-item label="项目名称">
      <el-input v-model="addProjectForm.projectName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="项目描述">
      <el-input v-model="addProjectForm.describe" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addProject">确 定</el-button>
  </div>
</el-dialog>

<el-dialog title="修改项目内容" :visible.sync="changeFormVisible">
  <el-form :model="changeProjectForm">
    <el-form-item label="项目名称">
      <el-input v-model="changeProjectForm.projectName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="项目描述">
      <el-input v-model="changeProjectForm.describe" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="changeFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="changeProject">确 定</el-button>
  </div>
</el-dialog>
  
    </el-col>
  </el-row>
</template>
<style>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .chart-container {
    width: 100%;
  }
  .chart-container .el-col {
    padding: 30px 20px;
  }
</style>

<script>

export default {
    data() {
      return {
        tableData: [{
          projectName:'项目1',
          describe:'项目1的介绍',
          time:0
        }],
        dialogFormVisible:false,
        changeFormVisible:false,
        addProjectForm:{
          projectName:'',
          describe:'',
          time:0
        },
        changeProjectForm:{}
      };
    },
    methods: {
      getList(){
        this.$http.get('/api/project/getProject').then((data) => {
          let datas=data.data;
          this.tableData=datas;
    	});
      },
      showAddProject(){
        this.dialogFormVisible=true;
      },
      addProject(){
        let para = Object.assign({}, this.addProjectForm);
        this.$http.post('/api/project/createProject', para).then((data) => {
          let datas=data.data;
          console.log(datas);
          this.dialogFormVisible=false;
          this.getList();
    	});
      },
      delProject(row){
        console.log(row);
        this.$http.delete('/api/project/delProject/'+row._id).then((data) => {
          let datas=data.data;
          this.getList();
    	});
      },
      showChangeProject(row){
        this.changeProjectForm=row;
        this.changeFormVisible=true;
      },
      changeProject(){
        let para = Object.assign({}, this.changeProjectForm);
        this.$http.put('/api/project/changeProject', para).then((data) => {
          let datas=data.data;
          this.changeFormVisible=false;
          this.getList();
    	});
      }
    },
    mounted(){
      this.getList();
    }
  }
</script>
