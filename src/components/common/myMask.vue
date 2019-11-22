<template>
    <div @click="hide_mask" v-if="isMask" style="height: 100vh;width: 100vw;background-color: rgba(0,0,0,0.7);position: fixed;z-index: 5">

    </div>
</template>

<script>
    export default {
        name: "myMask"
    }
</script>

<style scoped>

</style>
