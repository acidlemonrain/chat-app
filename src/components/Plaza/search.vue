<template>
    <div>
        <p class="subtitle">寻找好友</p>
        <label for="find">搜索关键字</label>
        <input id="find" type="text" v-model="form.nickname">
        <button @click="search">搜索</button>
    </div>
</template>

<script>
    export default {
        name: "search",
        data() {
            return {
                form:  {

                }
            }
        },
        methods: {
            search() {
                this.axios.post('user/search',this.form).then(res =>{
                   this.$emit('onsearch',res.data)
                })
            }
        },
    }
</script>

<style scoped>

</style>
