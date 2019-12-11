<template>

    <div class="box">
      <div class="header">
          <p>匿名聊天室</p>
          <p>聊天室内人数: {{online_nums}} </p>
      </div>

        <div class="chat-msg-window" ref="chatWindow">
            <div v-for="msg in msgs" class="box" style="background-color: rgba(107,107,107,0.15)">
                <div style="margin-bottom: 4px">

                    <p>{{msg.user}}  --  <small style="color: #cc896b">{{msg.gen|local}}</small></p>
                    <div class="chat-msg chat-msg-other" style="display: inline-block">

                         <span> {{msg.content}}</span>
                    </div>
                </div>
            </div>
        </div>


        <form  @submit.prevent="chat">
            <input required v-model="content" type="text">
            <button type="submit">发送</button>
        </form>

    </div>
</template>

<script>
    import moment from 'moment'
    import io from "socket.io-client";

    export default {


        data() {
            return {
                msgs: [],
                anoys_socket: null,
                online_nums:0,
                content:'',
                anoys_table:{
                    length:0
                }
            };
        },
        created(){
          this.init()
        },
        beforeDestroy(){
          this.anoys_socket.disconnect()
        },

        methods: {
            init() {
                if (this.anoys_socket == null) {
                    this.anoys_socket = io("http://106.15.183.147:5012/anoys");
                }
                this.anoys_socket.on("chat", msg => {
                    this.msgs.push(this.handle_msg(msg));
                    setTimeout(() => {
                        this.$refs.chatWindow.scrollTop = this.$refs.chatWindow.scrollHeight;
                    }, 20);
                });
                this.anoys_socket.on("onlineUser", sums => {
                   this.online_nums = sums
                });
            },
            handle_msg(msg){

                if(this.anoys_socket.id == msg.user ) {
                        msg.user = '我'
                }else{
                    if(typeof this.anoys_table[msg.user] !== 'undefined'){

                    }else{
                        this.anoys_table[msg.user] = (++this.anoys_table.length)
                    }
                    msg.user = '匿名用户'+ this.anoys_table[msg.user];
                }
                return msg

            },
            chat() {
                this.anoys_socket.emit("chat", {
                    content: this.content,
                    user: this.anoys_socket.id,
                    gen:new Date()
                });
                this.content = ''
            }
        }
    };
</script>

<style scoped>

</style>
