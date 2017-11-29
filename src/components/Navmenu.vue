<template>
    <div>
        <el-menu default-active="/dashboard"
                class="el-menu-vertical-demo"
                @select="handleSelect">
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
    </div>
</template>

<script>
export default {
  name: 'Navmenu',
  data () {
    return {
    }
  },
  methods: {
    handleSelect(path){
        this.$router.push({
            path: path
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    $height: 60px;
    $--header-color: #409EFF;
    .header{
        height: $height;
        background-color: $--header-color;
        .title{
            color: #fff;
            text-align: left;
            padding-left: 20px;
            line-height: 60px;
        }
    }
</style>
