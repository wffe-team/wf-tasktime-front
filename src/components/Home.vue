<template>
    <div id='app-root' class="container-fluid">
        <el-container class="container-box">
            <el-header class="header">
                <eHeader></eHeader>
            </el-header>
            <el-container class="container">
                <el-aside class="aside">
                  <Navmenu></Navmenu>
                </el-aside>
                <el-main class="main">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import eHeader from './Header'
import Navmenu from './Navmenu'
export default {
    name: 'home',
    components: {
        eHeader,
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
    $aside-color: #fff !default; 
    $min-width: 1260px !default; 
    $width-100: 100%; 
    $height-100: 100%; 
    $mg-t-n60:-60px;
    $mg-t-0:0px;
    $input-width:216px;
    @mixin all-page{
        width:$width-100;
        height:$height-100;
    }
    @mixin max-height{
        height:$height-100;
    }
    *{
        margin: 0px;
        padding: 0px;
    }
    html {
        @include all-page;
    }
    #app{
      @include max-height;
      margin-top: $mg-t-0;
    }
    body {
        @include max-height;
        background-color: $body-color;
    }
    .warp-breadcrum{
        margin-bottom:20px;
    }
    .box-card{
        padding:40px 20px;
        margin: 0 20px;
    }
    .el-card{
        box-shadow: none;
    }
    .el-card__body{
        padding:0px;
    }
    .el-menu{
        border-right: none;
    }
    .ruleForm{
        text-align: left;
    }
    .input{
        width:$input-width;
    }
    .container-fluid {
        @include max-height;
        min-width: $min-width;
        overflow: auto;
        .container-box{
            @include max-height;
            .header{
                padding: 0px;
            }
            .container {
                margin: $mg-t-n60 0 0 0;
                @include max-height;
                min-width: $min-width - 20px;
                box-sizing: border-box;
                border-top: 60px solid transparent;
                .main {
                    padding: 0px;
                }
                .aside{
                    background-color: $aside-color;
                    width: 210px !important;
                    border-right: solid 1px #e6e6e6;
                }
            }
        }
    }
    .navCss {
        padding: 15px 0 12px 20px;
        border-bottom: solid 1px rgb(224,229,232);
        margin: 0px;
        -moz-box-shadow: 0px 4px 20px #ccc;
        box-shadow: 0px 4px 20px #ccc;
    }
</style>
