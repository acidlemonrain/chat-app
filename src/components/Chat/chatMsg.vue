<template>
  <div style="margin: 20px 10px">

      <div v-if="msg.fromId == user.id" style="text-align: right">
        <div class="text-small" style="margin-bottom: 6px">{{msg.gen|local}}</div>
        <span class="chat-msg ">{{ msg.msg }}</span> : <img :src="require('@/assets/'+user.avatar+'.png')" alt="" style="width: 30px" />
          {{ user.nickname }}

    </div>
    <div v-if="msg.fromId !== user.id" >
        <div class="text-small" style="margin-bottom: 6px">{{msg.gen|local}}</div>
        <img :src="require('@/assets/'+friends[urlId].avatar+'.png')" alt="" style="width: 30px" />
        {{ friends[urlId].nickname }}   : <span class="chat-msg chat-msg-other">{{ msg.msg }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["msg"],
  name: "chatMsg"
};
</script>

<style scoped></style>
