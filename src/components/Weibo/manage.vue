<template>
    <div class="box">
        <p class="subtitle">
             互动消息管理
        </p>
        <div class="inner-box" v-for="wb in user.weibos" :key=wb.id >
            <p>{{wb.content}}</p>
            <img class="weibo-image"   v-if="wb.image !== ''" :src="'http://106.15.183.147:5012/file/'+wb.image" alt="">
            <div>
                <button @click="remove(wb)">删除</button>
            </div>
        </div>



    </div>
</template>
<script>
    export default {
        name: "manage",
        created() {

        },
        methods: {
            remove(wb) {
                this.axios.post('weibo/remove',wb).then(res=>{
                    console.log(res)
                    alert('删除成功')
                    this.refresh_user()
                })
            }
        },
    }
</script>

<style scoped>

</style>
