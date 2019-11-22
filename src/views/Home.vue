<template>
  <div class="home padding">
    <p class="title bottom-line">用户中心</p>

    <div class="btns">
      <a @click="status = 'basic'" :class="{ active: status == 'basic' }" class="btn-g">基本信息</a
      ><a @click="status = 'req'" :class="{ active: status == 'req' }" class="btn-g">验证提醒</a
      ><a @click="status = 'notify'" :class="{ active: status == 'notify' }" class="btn-g">好友消息</a>
    </div>

    <basic v-show="status == 'basic'"></basic>
    <notify v-show="status == 'notify'"  ></notify>
    <request v-show="status == 'req'" ></request>
  </div>
</template>

<script>
// @ is an alias to /src
import request from "../components/Home/request";

import basic from "../components/Home/basic";

import notify from "../components/Home/notify";
export default {
  name: "home",
  data() {
    return {
      status: "basic"
    };
  },
  components: {
    basic,
    notify,
    request
  }
};
</script>
