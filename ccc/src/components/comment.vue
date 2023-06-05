<template>
    <div class="comment">
        <div class="title" v-if="comment.list.length === 0">暂无评论</div>
        <div class="title" v-else>全部评论</div>
        <ul class="list">
            <li v-for="item in comment.list">
                <div>
                    <span>{{ item.userinfo.nickname }} : </span>
                    <span>{{ item.comment }}</span>
                </div>
                <div class="time">{{ item.time }}</div>
            </li>
        </ul>
        <div class="content">
            <div>评论：</div>
            <el-input
                v-model="currentComment.comment"
                :autosize="{ minRows: 4, maxRows: 10 }"
                type="textarea"
                placeholder="点击发表评论"
            />
        </div>
      <div style="width:70%; display:inline; position:absolute">&nbsp &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</div>
        <div class="btn">
            <el-button type="primary" @click="submit">提交</el-button>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useUser } from '@/stores/useLogin'
import { useRouter,useRoute } from 'vue-router'
import moment from 'moment'

const User = useUser()
const router = useRouter()
const route = useRoute()

const currentComment = reactive({
    userinfo:{},
    comment:'',
    time:''
})

//评论列表
const comment = reactive({
    list:[

    ]
})

//提交留言
const submit = () => {
    if(currentComment.comment === ''){
        return
    }else
    //如果没登录，跳转到登录页
    if(!User.isLogin){
        alert('请登录账号')
        router.push({path:'/login'})
    }else{
        currentComment.userinfo = User.userinfo
        currentComment.time = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
        comment.list.push({...currentComment})
        currentComment.comment = ''
    }
}

</script>

<style scoped lang='less'>

.comment{

    width: 100%;
    padding:20px 0;
    .title{
        padding:10px 0;
        border-bottom: 2px solid #e7e7e7;
    }

    .content{
        margin-top: 20px;


        &>div{
            padding:5px 0;
        }
    }

    .list{
        li{
            padding:10px 0;

            .time{
                font-size: 14px;
                text-align: end;
                color:#666;
            }
        }
    }

    .btn{
      display:inline;
      position: relative;
      left: 95%;
      width: 100%;
    }
}
</style>