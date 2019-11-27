<template>
    <div class="box">
        <p class="subtitle"> <router-link :to="'/user/'+weibo.author.id">{{weibo.author.nickname}}</router-link>  </p>
        <p class="text-small"> {{weibo.gen|local}} </p>
        <p>{{weibo.content}}</p>

        <img class="weibo-image"   v-if="weibo.image !== ''" :src="'http://106.15.183.147:5012/file/'+weibo.image" alt="">

        <p class="subtitle-1" @click="get_comments">评论区</p>

        <div v-for="ct in comments" :key="ct.id">

           <p> {{ct.author.nickname}} : <span class="text-small"> {{ct.content}} </span></p>
        </div>
        <textarea v-model="content" name="" id="" cols="30" rows="5">

        </textarea>
        <button @click="make_comment">评论</button>
    </div>
</template>

<script>
    export default {
         props:['weibo'],
        data() {
            return {
                comments:  [],
                content:''
            }
        },
        methods: {
             make_comment(){
                 if(this.user == null){
                        this.show_login_form()
                        this.show_mask()
                 }else{
                     this.axios.post('comment/create',{
                         content:this.content,
                         author:this.user,
                         weibo:this.weibo,
                         weiboId:this.weibo.id
                     }).then(res=>{
                         this.comments.push(res.data)
                     })
                 }

             },
            get_comments() {
                this.axios.post('weibo/comments',{id:this.weibo.id}).then(res=>{
                    this.comments = res.data.comments
                })
            }
        },
        created() {
             this.get_comments()
        }
    }
</script>

<style scoped>

</style>
