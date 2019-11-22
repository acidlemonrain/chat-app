import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
Vue.use(Vuex);
import io from "socket.io-client";

const store = new Vuex.Store({
  state: {
    socket: io("http://106.15.183.147:5012"),
    user: null,
    token: null,
    clock: 1,
    reqUser:null,
    isMask:false,
    isInit:false,
    isLoginForm:false,
    isTipForm:false,
    friends: {
      update: 0
    }
  },
  mutations: {
    setMask(state,data){
      state.isMask = data
    },
    add(state, num) {
      state.clock += num;
    },
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
    setMsgs(state, data) {
      state.friends[data.id].msgs = data.msgs
      state.friends[data.id].notify = 0
      state.friends.update++
    },
    setLoginForm(state,data){
      state.isLoginForm = data
    },
    setTipForm(state,data){
      state.isTipForm = data
    },
    setReqUser(state,data){
      state.reqUser = data
    },
    clearNotify(state,data){
      state.friends[data].notify = 0
      state.friends.update++
    }
  },
  actions: {
    initUser({ commit, state }, data) {
      commit("setUser", data.user);
      if(data.access_token) commit("setToken", data.access_token);
      //朋友列表
      state.user.friends.forEach(fd => {
        state.friends[fd.id] = { ...fd, ...{ status: false, msgs: [] } };
        state.friends.update++;
      });
     if(!state.isInit){
       state.socket.emit("login", data.user);
       //监听上线好友
       state.socket.on("online", user => {
         console.log(user.username + "有好友上线");
         state.friends[user.id].status = true;
         state.friends.update++;
       });
       //监听聊天chat信息
       state.socket.on("chat", data => {
         if (data.fromId === state.user.id) {
           state.friends[data.toId].msgs.push(data);
           state.friends.update--;
         } else {
           state.friends[data.fromId].msgs.push(data);
           state.friends[data.fromId].notify++;
           state.friends.update++;
         }
       });
       //监听离线消息
       state.socket.on('offline', user => {
         console.log(user.username + "有好友下线");
         state.friends[user.id].status = false;
         state.friends.update--;
       })
     }
      state.isInit = true
    },
    logout({ commit ,state}) {
      commit("setUser", null);
      commit("setToken", null);
      state.socket.disconnect()
      state.friends = {
        update: 0
      }
    }
  },

  plugins: [
    new VuexPersistence({

      reducer: state => ({ user: state.user,token:state.token }),
    }).plugin
  ]
});

export default store;
