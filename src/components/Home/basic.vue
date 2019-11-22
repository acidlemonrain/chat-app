<template>
    <div class="box" style="width: 600px;position: relative">
        <div v-show="!is_edit">
            <p class="subtitle">基本信息</p>
            <div style="display: flex">
                <img  :src="require('@/assets/'+user.avatar+'.png')" alt="" style="width: 140px" />
            </div>
            <p>
                用户名 : <span class="info">{{ user.username }}</span>
            </p>
            <p>
                昵称 : <span class="info">{{ user.nickname }}</span>
            </p>
            <p>
                邮箱 : <span class="info">{{ user.email }}</span>
            </p>
            <p>
                上一次登录时间 : <span class="info">{{ user.lastLogin | local }}</span>
            </p>
            <p>
            生日 : <span class="info"> {{ user.birth |local}} </span>
            </p>
            <p>
                性别 : <span class="info"> {{ user.sex?'男':'女' }} </span>
            </p>
            <p>
                年龄 : <span class="info"> {{ user.age }} </span>
            </p>
            <p>
                冻结状态 : <span class="info"> {{ user.freezeDate | leftdays }} </span>
            </p>
            <p>
                个人简介 : <span class="info"> {{ user.des }} </span>
            </p>
            <p>
                <router-link :to="'/user/'+user.id">我的主页</router-link>
            </p>
            <button @click="is_edit = !is_edit" style="position: absolute;right: 20px;top: 20px">修改信息</button>
        </div>
        <div v-show="is_edit">
            <p class="title">信息修改</p>
            <p>头像</p>
            {{form.avatar}}
            <div>
                <img :class="{select:avatar == item-1}" @click="change_avatar(item-1)" :src="require('@/assets/'+(item-1)+'.png')" alt="" v-for="item in 6" style="width: 40px;height: 40px;">
            </div>

            <label for="username">用户名</label>
            <input id="username" type="text" v-model="form.username">
            <label for="nickname">用户昵称</label>
            <input id="nickname" type="text" v-model="form.nickname">
            <label for="age">年龄</label>
            <input id="age" type="text" v-model="form.age">
            <label for="birth">出生日期</label>
            <input id="birth" type="date" v-model="form.birth">
            <div>
                <input type="radio" id="one" value="true" v-model="form.sex" style="display: inline-block">
                <label for="one">男</label>
                <input type="radio" id="two" value="false" v-model="form.sex" style="display: inline-block">
                <label for="two">女</label>
            </div>
            <label for="email">电子邮箱</label>
            <input id="email" type="text" v-model="form.email">
            <label for="des">简介</label>
            <input id="des" type="text" v-model="form.des">
            <button @click="update_info">确定</button>
            <button @click="is_edit = !is_edit" style="position: absolute;right: 20px;top: 20px">返回</button>
        </div>



    </div>
</template>

<script>
    import moment from 'moment';
    export default {
        name: "basic",
        created(){
            var user = this.user
            for(let pe in user){
                this.form[pe] = user[pe]
            }
            this.avatar = this.form.avatar
        },
        data() {
            return {
                is_edit: false,
                form:{},
                avatar:0
            }
        },
        methods: {
            update_info() {
                console.log(this.form)
                this.axios.post('user/update',this.form).then(res=>{
                    alert('修改成功')
                    this.is_edit = false
                })
            },
            change_avatar(num){
                this.avatar = num
                this.form.avatar = num
            }
        },
        filters: {
            leftdays: function (value) {
                let now = moment(new Date())
                let freeze = moment(value)
                var diff = freeze.diff(now,"days")
                console.log(diff)
                if(diff>0) return '被终结'+diff+'天'
                else return '正常'
            }
        }
    }
</script>

<style scoped>
.select{
    background-color: rgba(240, 122, 83, 0.57);
}
</style>
