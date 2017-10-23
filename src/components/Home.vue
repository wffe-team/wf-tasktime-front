<template>
  <div class="hello">
    <input class="form-control" id="inputEmail3" placeholder="请输入账号" v-model="account">
	<input type="password" class="form-control" id="inputPassword3" placeholder="请输入密码" v-model="password">
	<button type="submit" class="btn btn-default" @click="login">登录</button>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      account: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$http.get('/api/login/getAccount').then((response) => {
        // 响应成功回调
        console.log(response)
        let params = {
          account: this.account,
          password: this.password
        }
        // 创建一个账号密码
        return this.$http.post('/api/login/createAccount', params)
      }).then((response) => {
        console.log(response)
      }).catch((reject) => {
        console.log(reject)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
