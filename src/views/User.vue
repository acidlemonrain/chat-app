<template>
  <div v-if="u !== null">
    <p class="title">{{ u.nickname }}的主页</p>
    <basic  :u="u" ></basic>
    <div class="btns">
      <a
        @click="status = 'weibo'"
        :class="{ active: status == 'weibo' }"
        class="btn-g"
        >他的互动空间</a
      ><a
        @click="status = 'board'"
        :class="{ active: status == 'board' }"
        class="btn-g"
        >留言板</a
      >
    </div>

    <weibos v-show="status == 'weibo'" :u="u"></weibos>
    <board v-show="status == 'board'" :u="u"></board>
  </div>
</template>

<script>
import basic from "../components/User/basic";
import weibos from "../components/User/weibos";
import board from "../components/User/board";

export default {
  name: "User",
  components: { basic, weibos, board },
  data() {
    return {
      u: null,
      status: "weibo"
    };
  },
  created() {
        this.init()
  },
    methods: {
        init() {
            this.axios.post("user/detail", { id: this.urlId }).then(res => {
                this.u = res.data;
            });
        }
    },
    watch: {
        urlId(newValue, oldValue) {
            this.init()
        }
    },
};
</script>

<style scoped></style>
