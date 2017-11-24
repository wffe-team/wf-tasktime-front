<template>
  <div class="bodyCss">
	<el-form :model="loginForm"
                 :rules="loginRule"
                 ref="loginForm"
                 label-position="left"
                 class="login-container">
            <h3 class="title"></h3>
            <el-col :span="24">
                <el-form-item label="" prop="account">
                    <el-input type="text"
                              v-model="loginForm.account"
                              @keyup.enter.native="login"
                              auto-complete="off" placeholder="账号"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="" prop="password">
                    <el-input type="password"
                              v-model="loginForm.password"
                              @keyup.enter.native="login"
                              auto-complete="off" placeholder="密码"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item style="width:100%;">
                    <el-button type="primary" style="width:100%;" @click.native="login" :loading="logining">登录</el-button>
                </el-form-item>
            </el-col>
        </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      account: '',
      password: '',
      logining: false,
      loginForm: {
	      account: '',
	      password: ''
	  },
	  loginRule: {
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    },
    guid () {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4();
    },
    login () {
	    this.$refs.loginForm.validate((valid) => {
	        if (valid) {
	            let that = this;
	            this.logining = true;
	            let para = Object.assign({}, this.loginForm);
	            this.$http.post('/api/login/getAccount', para).then((data) => {
	                let dataSet = data.data;
	                if(dataSet=='none'){
                    para.userId = that.guid();
                    console.log(that.guid());
                    console.log(para);
	                	this.$http.post('/api/login/createAccount', para).then((data) => {
	                		localStorage.setItem('access-user', JSON.stringify(data.data));
	                		this.logining = false;
	                		this.$router.push({ path: '/' });
	                	});
	                }else{
	                	this.logining = false;
	                	localStorage.setItem('access-user', JSON.stringify(dataSet));
	                	this.$router.push({ path: '/' });
	                	console.log(this.$router.push);
	                }
	            })
	        }
	     });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
