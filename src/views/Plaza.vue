<template>
    <div>
        <p class="title">
            交友广场
        </p>
        <search @onsearch="onsearch"></search>
        <div class="flex-wrap">
                  <div  v-if="fil(u.id)" style="width: 200px; margin: 10px" class="box user-ani" v-for="u in users" :key="u.id" >
                      <img :src="require('@/assets/'+u.avatar+'.png')" alt="" style="width: 90px;height: 90px" />
                      <p>{{u.nickname}}</p>
                      <button @click="send_req(u)">添加好友</button>
                      <router-link :to="'user/'+u.id">查看主页</router-link>
                  </div>
             <div ref="more" style="height: 200px;opacity: 0">
                 更多
             </div>
        </div>
    </div>
</template>

<script>
    import search from "../components/Plaza/search";


    export default {
        components:{search},
        name: "Plaza",
        data() {
            return {
                users:  [],
                page:1,
                pages:0
            }
        },
        created() {
            this.get_users()
        },
        mounted(){
           let observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.intersectionRatio > 0) {
                        this.page++
                       this.get_users()
                    }
                });
            });
           observer.observe(this.$refs.more)
        },
        methods: {
            get_users(){
                this.axios.post('user/get',{page:this.page}).then(res=>{
                    this.users = [...this.users,...res.data.users]
                })
            },
            onsearch(event){
                this.users = event
            },
            fil(id) {
                var bool = true;
                if(id == this.user.id) bool = false;
                this.user.friends.forEach(fd => {
                    if( fd.id == id) bool = false
                })
                return bool
            },
            send_req(u){
                this.$store.commit('setReqUser',u)
               this.show_mask()
            }
        },
    }
</script>

<style scoped>

</style>
