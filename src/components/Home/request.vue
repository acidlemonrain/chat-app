<template>
    <div class="box" style="width: 600px">
        <div>
           <p class="subtitle">我发送的请求</p>
            <div class="request-item " v-for="q in user.tos" :key="q.id" v-if="!q.fromDel">

                 <p>接受方:  <router-link :to="'/user/'+q.to.id">{{q.to.nickname}}</router-link>  </p>
                 <p>验证消息:{{q.msg}}</p>
                 <p>状态: {{q.status|status}}</p>
                <button @click="remove(q.id)">删除信息</button>
            </div>
            <p class="subtitle-1" v-if="!is_have_req_to"> 没有找到你发送的好友请求</p>
            <p class="subtitle">我收到的请求</p>
            <div class="request-item " v-for="q in user.froms" :key="q.id" v-if="!q.toDel">
                <p>发送者:  <router-link :to="'/user/'+q.from.id">{{q.from.nickname}}</router-link> </p>
                <p>验证消息:{{q.msg}}</p>
                <p>状态: {{q.status|status}}</p>
                <div v-if="q.status == 0 ">
                    <button @click="agree(q.id)">接受</button>
                    <button @click="refuse(q.id)">拒绝</button>

                </div>
                <button @click="remove(q.id)">删除信息</button>
            </div>
            <p class="subtitle-1" v-if="!is_have_req_from"> 还没有人向你发送好友请求</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "request",
        filters:{
            status(v){
               var s = '待处理'
                if(v == 1 ) s = '已同意'
                if(v == -1) s= '已被拒绝'
                return s
            }
        },
        data() {
            return {
                is_have_req_to:false,
                is_have_req_from:false
            }
        },
        created(){

            if(this.user.tos.find(u=>!u.fromDel)) this.is_have_req_to =true
            if(this.user.froms.find(u=>!u.toDel)) this.is_have_req_from =true
        },
        methods: {

            agree(id){
                this.axios.post('request/agree',{id:id}).then(res=>{
                    console.log(res.data)
                })
            },
            refuse(id) {
                this.axios.post('request/refuse',{id:id}).then(res=>{
                    console.log(res.data)
                })
            },
            remove(id){
                this.axios.post('request/delete',{id:id,userId:this.user.id}).then(res=>{
                    console.log(res.data)
                })
            }
        },
    }
</script>

<style scoped>

</style>
