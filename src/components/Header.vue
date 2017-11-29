<template>
    <div>
        <header class="header">
            <div class="title">
                工时管理系统
            </div>
        </header>
    </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
    }
  },
  methods: {
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
