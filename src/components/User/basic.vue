<template>
    <div class="box">
        <div class="basic-image">

            <img  class="" :src="require('@/assets/'+u.avatar+'.png')" alt="" style="width: 100px" />
             <p class="text-center"> {{ u.nickname }}</p>
        </div>
        <p style=" margin-top: 70px;">
            用户ID : <span class="info">{{ u.username }}</span>
        </p>

        <p>
            邮箱 : <span class="info">{{ u.email }}</span>
        </p>

        <p>
            生日 : <span class="info"> {{ u.birth }} </span>
        </p>
        <p>
            性别 : <span class="info"> {{ u.sex?'男':'女' }} </span>
        </p>
        <p>
            年龄 : <span class="info"> {{ u.age }} </span>
        </p>
        <p>
            个人简介 : <span class="info"> {{ u.des }} </span>
        </p>
    </div>
</template>

<script>
    export default {
        props:['u'],
        name: "basic"
    }
</script>

<style scoped>

</style>
