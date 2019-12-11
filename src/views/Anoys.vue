<template>
  <div>
    <h1>匿名聊天</h1>

    <div
      v-if="!room_mode"
      class="anoys-containe inner-box"
      style="cursor: pointer"
      @click="enter_room"
    >
      <h1 class="text-center" style="margin: 100px">点击进入匿名聊天室</h1>
    </div>

    <room v-if="!!room_mode"  ></room>
  </div>
</template>

<script>
import room from "../components/Anoys/room";

export default {
  components: { room },
  name: "Anoys",
  data() {
    return {
      room_mode: false,


    };
  },

  methods: {
    enter_room() {

      this.room_mode = true;

    },

  }
};
</script>

<style scoped></style>
