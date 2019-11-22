<template>
    <nav>
        <router-link class="nav-item" to="/home" v-show="user" v-if="user !==null">用户中心</router-link>
        <router-link class="nav-item" to="/about">关于</router-link>
        <router-link  class="nav-item" to="/plaza" v-show="user !==null">寻找更多好友</router-link>
        <router-link class="nav-item" to="/weibo">互动空间</router-link>
        <router-link class="nav-item" to="/register" v-show="user == null">注册</router-link>
        <button class="nav-item" @click="refresh" v-show="user !== null">刷新</button>
        <button @click="login" style="position: absolute;right: 10px;top: 5px" v-show="!user">登录</button>
        <button v-show="user" style="position: absolute;right: 10px;top: 5px" @click.self="isFriend = !isFriend">我的好友
            <friendPanel :class="{friend_panel_normal:isFriend}"></friendPanel>
        </button>
    </nav>
</template>

<script>
import friendPanel from "./friendPanel";

    export default {
        components:{friendPanel},
        name: "appNav",
        data() {
            return {
                isFriend: false
            }
        },
        methods: {
            refresh(){
              this.axios.post('user/refresh',{id:this.user.id}).then(res=>{
                   this.$store.dispatch('initUser',(res.data))
              })
            },
            login() {
                this.show_login_form();
                this.show_mask();
            }
        },
    }
</script>

