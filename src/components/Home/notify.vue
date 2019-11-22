<template>
    <div class="box" style="width: 600px">
        <p class="subtitle">好友消息提醒</p>
         <div>
              <div v-if="isNotify">
                  <p v-for="fd in friends" :key="fd.id" v-if="fd.notify !==0 ">
                      {{fd.username}}对你发送了{{fd.notify}}条消息，请查看。
                  </p>
              </div>
             <p v-if="!isNotify">
                 目前还没有好友给你留言
             </p>
         </div>
    </div>
</template>

<script>
    export default {
        name: "notify",
        computed:{
            isNotify(){
                var bool = false;
                for (let fd in this.friends){
                    if (fd.notify !== 0) {bool = true; break}
                }
                return bool
            }
        }
    }
</script>

<style scoped>

</style>
