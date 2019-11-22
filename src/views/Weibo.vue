<template>
  <div>
      <p class="title padding" >互动空间</p>
    <div class="btns" v-if="user !== null">
      <a
        @click="status = 'weibo'"
        :class="{ active: status == 'weibo' }"
        class="btn-g"
        >基本信息</a
      ><a
        @click="status = 'manage'"
        :class="{ active: status == 'manage' }"
        class="btn-g"
        >互动消息管理</a
      >
    </div>
    <div v-show="status == 'weibo'">
        <make-weibo v-if="user !== null"></make-weibo>
        <weiboItem v-for="(weibo, index) in weibos" :key="index" :weibo="weibo">
        </weiboItem>
        <button class="weibo-loadmore" @click="page++" v-if="is_more">
            加载更多
        </button>
        <span v-if="!is_more">没有更多的内容了</span>
    </div>
      <div v-show="status == 'manage'" v-if="user !== null">
          <manage></manage>
      </div>
  </div>
</template>

<script>
    import manage from "../components/Weibo/manage";


import makeWeibo from "../components/Weibo/makeWeibo";
import weiboItem from "../components/Weibo/weiboItem";

export default {
  components: { makeWeibo, weiboItem,manage },
  name: "Weibo",
  data() {
    return {
      weibos: [],
      page: 1,
      is_more: true,
       status:'weibo'
    };
  },
  methods: {
    get_weibos() {
      this.axios.post("weibo", { page: this.page }).then(res => {
          res.data = res.data.weibos
        if (res.data.length == 0) this.is_more = false;
        this.weibos = [...this.weibos, ...res.data];
      });
    }
  },
  created() {
    this.get_weibos();
  },
  watch: {
    page(to, oldValue) {
      this.get_weibos();
    }
  }
};
</script>

<style scoped></style>
