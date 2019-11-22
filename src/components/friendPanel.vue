<template>
    <div class="friend-panel" style="text-align: right">
        <button @click="logout">退出</button>
        <p class="title text-center">我的好友</p>
        <div class="content">
            <div class="friend-item flex-between" v-if="fd.status" v-for="fd in friends" :key="fd.id" :fd="fd">
                <div>
                    <router-link :to="'/user/'+fd.id"><img :src="require('@/assets/'+fd.avatar+'.png')" alt="" style="width: 30px" /></router-link>
                    <div> {{fd.username}}
                    <span v-show="fd.notify > 0" class="msg-notify">{{fd.notify}}</span>
                    </div>
                </div>
                   <div>
                       <div> 状态:在线  </div>
                       <router-link :to="'/chat/'+fd.id" class="small-btn">发送消息</router-link>
                   </div>
            </div>
            <div class="friend-item  flex-between" v-if="!fd.status" v-for="fd in friends" :key="fd.id" :fd="fd">
                <div>
                    <router-link :to="'/user/'+fd.id"><img :src="require('@/assets/'+fd.avatar+'.png')" alt="" style="width: 30px" /></router-link>
                    <div> {{fd.nickname}} </div>
                </div>
                <div>
                    <div> 状态:离线 </div>
                    <router-link :to="'/chat/'+fd.id" class="small-btn">发送消息</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import friendItem from "./friendItem";

    export default {
        components:{friendItem},
        name: "friendPanel",
    }

</script>

<style scoped>

</style>
