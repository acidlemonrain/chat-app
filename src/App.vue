<template>
  <div id="app">
    <myMask></myMask>
    <reqForm></reqForm>
    <login-form></login-form>
    <app-nav></app-nav>
    <article>
      <router-view />
    </article>
  </div>
</template>

<script>
import appNav from "./components/appNav";
import LoginForm from "./components/common/LoginForm";

import myMask from "./components/common/myMask";
import friendPanel from "./components/friendPanel";
import reqForm from "./components/common/reqForm";

export default {
  components: { appNav, myMask, LoginForm, friendPanel, reqForm },
  created() {
    if (!this.$store.state.isInit && this.user) {
      this.$store.dispatch("initUser", { user: this.user });
    }
  }
};
</script>
<style lang="scss"></style>
