<template>
    <div class="weibo-textarea">
        <textarea style="width: 100%" @focusin="show_mask" v-model="content" name="" id="" cols="30" rows="10">

        </textarea>
        <div v-show="isMask">
            <button @click="make_weibo" style="margin-right: 10px">发表</button>
            <button @click="upload_file">上传图片</button>
        </div>
        <input type="file" @change="handle()" ref="file" style="display: none" />
        <img src="" alt="" ref="img" width="100px">
    </div>
</template>

<script>
    export default {
        name: "makeWeibo",
        data() {
            return {
                    content:'把想说的写到这里吧！~'
            }
        },
        methods: {
            make_weibo() {
               if(this.isFreeze(this.user.freezeDate)){
                   alert('你的账户已被冻结')
               }else{
                   var form = new FormData();
                   console.log(this.$refs.file.files[0])
                   form.append("file", this.$refs.file.files[0]);
                   form.append('author',this.user.id)
                   form.append('content',this.content)
                   this.axios.post('weibo/create',form).then(res=>{
                      this.$emit('created',null)
                       alert('发表成功')
                       this.hide_mask()
                       this.content = ''
                       this.$refs["img"].src ='';
                   })
               }
            },
            handle() {
                let reader = new FileReader();
                reader.readAsDataURL(this.$refs.file.files[0]);
                reader.onload = () => {
                    this.$refs["img"].src = reader.result;
                };
            },
            upload_file(){
                this.$refs.file.click()
            }
        },
    }
</script>

<style scoped>

</style>
