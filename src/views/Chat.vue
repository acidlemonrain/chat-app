<template>
  <div>
    <div class="tip-form box" v-if="isTipForm">
        <p class="title">举报</p>
        <p>被举报用户 : {{friends[urlId].nickname}}  </p>
      <label for="content">理由</label>
      <textarea   v-model="tip_content" id="content" cols="30" rows="10">

      </textarea>
      <button @click="submit_tipform">确定</button>
    </div>
    <div class="chat-msg-window" v-show="isHistories">
      <chat-msg v-for="msg in histories" :key="msg.id" :msg="msg"></chat-msg>
    </div>
    <div class="chat-msg-window" v-show="!isHistories">
      <chat-msg
        v-for="msg in friends[urlId].msgs"
        :key="msg.id"
        :msg="msg"
      ></chat-msg>
    </div>

    <textarea v-model="msg" style="width: 100%;resize: none"> </textarea>
    <button @click="chat">发送</button>
    <button @click="history">历史记录</button>
    <button @click="show_tipform">举报该用户</button>
  </div>
</template>

<script>
import chatMsg from "../components/Chat/chatMsg";

export default {
  components: { chatMsg },
  name: "Chat",
  data() {
    return {
      histories: [],
      isHistories: false,
      msg: "",
      tip_content:''
    };
  },
  created() {
    if (this.friends[this.urlId].notify != 0) {
      this.$store.commit('clearNotify',this.urlId)
      //获取历史信息
      this.axios
        .post("/history/notify", {
          fromId: this.user.id,
          toId: this.urlId,
          nums:
            this.friends[this.urlId].notify +
            this.friends[this.urlId].msgs.length
        })
        .then(res => {
          this.$store.commit("setMsgs", { id: this.urlId, msgs: res.data });
        });
    }
  },
  methods: {
    submit_tipform(){
      let data = {
        toId:this.urlId,
        fromId:this.user.id,
        to:this.friends[this.urlId],
        from:this.user,
        content:this.tip_content
      }
      this.axios.post('tip',data).then(res=>{
        console.log(res)
      })
    }
    ,
    show_tipform(){
      this.$store.commit('setTipForm',true)
      this.show_mask()
    }
    ,
    history() {
      console.log({ toId: this.urlId, fromId: this.user.id });
      this.axios
        .post("/history", { toId: this.urlId, fromId: this.user.id })
        .then(res => {
          this.histories = res.data;
          this.isHistories = !this.isHistories;
        });
    },
    chat() {
     if(this.isFreeze(this.user.freezeDate)) {
        alert('你的账户已被冻结')
     }else{
       const data = {
         fromId: this.user.id,
         msg: this.msg,
         toId: this.urlId
       };
       if (!this.friends[this.urlId].status) {
         this.axios.post("notify", data).then(res => {
         });
       }
       this.socket.emit("chat", data);
     }
    }
  }
};
</script>

<style scoped></style>
