<template>
    <div id='app-root' class="container-fluid">
        <el-container class="container-box">
            <el-header class="header">
                <Header></Header>
            </el-header>
            <el-container class="container">
                <el-aside width="210px">
                  <Navmenu></Navmenu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Header from './Header'
import Navmenu from './Navmenu'
export default {
    name: 'home',
    components: {
        Header,
        Navmenu,
    },
    created(){
    },
    data () {
        return {
        sysUserName: '',
        }
    },
    methods: {
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
    $input-width:216px;
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
    .warp-breadcrum{
        margin-bottom:20px;
    }
    .box-card{
        padding:40px 20px;
    }
    .el-card__body{
        padding:0px;
    }
    .ruleForm{
        text-align: left;
    }
    .input{
        width:$input-width;
    }
    .container-fluid {
        @extend html;
        min-width: $min-width;
        overflow: auto;
        .container-box{
            @extend html;
            .header{
                padding: 0px;
            }
            .container {
                margin: $mg-t-n60 0 0 0;
                height: $height-100;
                min-width: $min-width - 20px;
                box-sizing: border-box;
                border-top: 60px solid transparent;
            }
        }
    }
</style>
