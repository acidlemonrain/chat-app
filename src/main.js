import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/app.scss'
import moment from 'moment';
Vue.config.productionTip = false
Vue.mixin({
  computed:{
    isMask(){
      return this.$store.state.isMask;
    },
    urlId(){
      return this.$route.params.id
    },
    isLoginForm(){
      return this.$store.state.isLoginForm;
    },
    isTipForm(){
      return this.$store.state.isTipForm;
    },
    user () {
      return this.$store.state.user;
    },
    socket() {
      return this.$store.state.socket;
    },
    friends() {
      let _users = {...this.$store.state.friends}
      delete _users.update
      return _users;
    },
    reqUser(){
      return this.$store.state.reqUser;
    }
  },
  filters:{
    local(v){
       var _time = moment(v).format('YYYY-MM-DD HH:mm:ss')
       var now  = moment(new Date())
       var diff = now.diff(moment(v),"hours")
       if(diff<24) _time =   diff+'小时之前'
       diff = now.diff(moment(v),"minutes")
       if(diff<60) _time =   diff+'分钟之前'
       return _time
    }
  },
  methods: {
    isFreeze(date){
      let now = moment(new Date())
      let freeze = moment(date)
      if(now.isBefore(freeze)) return true
      else return false
    },
    show_mask : function () {
      this.$store.commit('setMask',true)
    } ,
    hide_mask: function () {
      this.$store.commit('setMask',false)
      this.$store.commit('setTipForm',false)
      this.hide_login_form();
      this.$store.commit('setReqUser',null)
    },
    show_login_form : function () {
      this.$store.commit('setLoginForm',true)
    },
    hide_login_form : function () {
      this.$store.commit('setLoginForm',false)
    },
    logout(){
      this.$router.push('/about')
      this.$store.dispatch('logout')
    }
  },
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
