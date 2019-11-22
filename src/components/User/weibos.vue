<template>
    <div class="box">
        <div class="inner-box" v-for="wb in u.weibos" :key=wb.id >
           <p>{{wb.content}}</p>
            <img class="weibo-image"   v-if="wb.image !== ''" :src="'http://localhost:3000/file/'+wb.image" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        props:['u'],
        name: "weibos"
    }
</script>

<style scoped>

</style>
