<template>
    <div class="login-form" v-if="reqUser !== null">
        <div class="container">
            <div class="title text-center">
                好友请求
            </div>
            <input type="text" v-model="msg">
            <button @click="send_req">发送</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "reqForm",
        data() {
            return {
                msg: 'value'
            }
        },
        methods: {
            send_req() {
                const data = {
                    from:this.user,
                    to:this.reqUser,
                    fromId:this.user.id,
                    toId:this.reqUser.id,
                    msg:this.msg
                }
               this.axios.post('/request',data).then(res=>{
                   console.log(res)
               })
            }
        },
    }
</script>

<style scoped>

</style>
