<template>
    <div class="login-form" v-if="isLoginForm">
      <div class="container">
          <div class="title text-center">
              登录
          </div>
          <label for="username">用户ID</label>
          <input id="username" type="text" v-model="form.username">
          <label for="password">密码</label>
          <input id="password" type="password" v-model="form.password">
          <button @click="login">登录</button>
          <button>注册</button>
      </div>
    </div>
</template>

<script>
    export default {
        name: "LoginForm",
        data() {
            return {
                form: {}
            }
        },
        methods: {
            login() {
                this.axios.post('user/login',this.form).then(res=>{
                    if(res.data.user.id){
                        this.hide_mask()
                        this.$store.dispatch('initUser',res.data)
                        this.$router.push('/home')
                    }
                })
            }
        },
    }
</script>

<style scoped>

</style>
