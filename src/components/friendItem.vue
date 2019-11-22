<template>
    <div class="friend-item">
        <p>{{fd.username}}</p>
        <p> {{fd.status}} </p>
    </div>
</template>

<script>
    export default {
        props:['fd'],
        name: "friendItem"
    }
</script>

<style scoped>

</style>
