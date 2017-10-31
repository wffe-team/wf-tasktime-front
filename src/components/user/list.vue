<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>个人工时记录</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24">
        asd
    </el-col>
  </el-row>
</template>

<script>

  export default {
    data() {
      return {
        filters: {
          name: ''
        },
        loading: false,
        users: [
        ]
      }
    },
    methods: {
    },
    mounted() {
      
    }
  }
</script>

<style scoped>

</style>
