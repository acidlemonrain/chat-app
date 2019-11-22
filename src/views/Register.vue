<template>
    <div>
        <p class="title">注册</p>
        <label for="username">用户名</label>
        <input id="username" type="text" v-model="form.username">
        <label for="nickname">用户昵称</label>
        <input id="nickname" type="text" v-model="form.nickname">
        <label for="age">年龄</label>
        <input id="age" type="text" v-model="form.age">
        <label for="password">密码</label>
        <input id="password" type="text" v-model="form.password">
        <label for="password">出生日期</label>
        <input id="birth" type="date" v-model="form.birth">
       <div>
           <input type="radio" id="one" value="true" v-model="form.sex" style="display: inline-block">
           <label for="one">男</label>
           <input type="radio" id="two" value="false" v-model="form.sex" style="display: inline-block">
           <label for="two">女</label>
       </div>
        <label for="email">电子邮箱</label>
        <input id="email" type="text" v-model="form.email">
        <button @click="register">注册</button>
    </div>
</template>

<script>
    export default {
        name: "Register",
        data() {
            return {
                form: {
                    username:'',
                    nickname:'',
                    password:'',
                    age:'',
                    sex:true,
                    birth:'',
                    email:''
                }
            }
        },
        methods: {
            register(){
                this.axios.post('user/register',this.form).then(res=>{
                    console.log(res)
                })
            }
        },
    }
</script>

<style scoped>

</style>
