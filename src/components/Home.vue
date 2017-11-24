<template>
    <div id='app-root' class="container-fluid">
        <el-container class="container-box">
            <el-header>Header</el-header>
            <el-container class="container">
                <el-aside width="210px">
                  <el-menu default-active="/dashboard"
                           class="el-menu-vertical-demo"
                           @open="handleOpen"
                           @close="handleClose"
                           @select="handleSelect"
                           background-color="#545c64"
                           text-color="#fff"
                           active-text-color="#ffd04b">
                      <el-menu-item index="/dashboard">
                          <span slot="title">项目列表</span>
                      </el-menu-item>    
                      <el-menu-item index="/user/list">
                          <span slot="title">用户管理</span>
                      </el-menu-item>
                      <el-submenu index="">
                          <template slot="title">
                              管项目理
                          </template>
                          <el-menu-item-group>
                              <el-menu-item index="/project/list">
                                      项目列表
                              </el-menu-item>
                              <el-menu-item index="/worklog/list">
                                      项目工时列表
                              </el-menu-item>
                          </el-menu-item-group>
                      </el-submenu>
                  </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
  export default {
    name: 'home',
    created(){
    },
    data () {
      return {
        sysUserName: '',
      }
    },
    methods: {
      handleOpen() {
      },
      handleClose() {
      },
      handleSelect(path){
        this.$router.push({
          path: path
        });
      }
    },
    mounted() {
      var user = sessionStorage.getItem('access-user');
      if (user) {
        user = JSON.parse(user);
        this.sysUserName = user.name || '';
      }
    }
  }


</script>


<style lang="scss">
    $body-color: #f7f7f9 !default; 
    $head-color: #F90 !default; 
    $min-width: 1280px !default; 
    $width-100: 100%; 
    $height-100: 100%; 
    $mg-t-n60:-60px;
    $mg-t-0:0px;
    @mixin all-page{
        width:$width-100;
        height:$height-100;
    }
    html {
        @include all-page;
    }
    #app{
      @extend html;
      margin-top: $mg-t-0;
    }
    body {
        @extend html;
        background-color: $body-color;
    }
    .container-fluid {
        @extend html;
        min-width: $min-width;
        overflow: auto;
        .container-box{
            @extend html;
        }
    }
    .container {
        margin: $mg-t-n60 0 0 0;
        height: $height-100;
        min-width: $min-width - 20px;
        box-sizing: border-box;
        border-top: 60px solid transparent;
    }
</style>
