<template>
    <div>
        <p class="subtitle">
            留言板
        </p>
        
        <div class="box" >
             <p v-for="bd in u.boards" :key="bd.id">
                 {{bd.author.nickname}} : {{bd.content}}
             </p>
        </div>

        <div class="box">
            <p class="subtitle">
                留言
            </p>
            <textarea name="" id="" cols="30" rows="10" v-model="content"></textarea>
            <button @click="send">留言</button>
        </div>
    </div>
</template>

<script>
    export default {
        props:['u'],
        name: "board",
        data() {
            return {
                content: ''
            }
        },
        methods: {
            send() {
                this.axios.post('board',{
                    belonger:this.u,
                    author:this.user,
                    content:this.content
                }).then(res=>{
                   this.$emit('board')
                })
            }
        },
    }
</script>

<style scoped>

</style>
