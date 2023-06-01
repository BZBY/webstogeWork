<template>
    <!-- 用户主页 -->
    <div class="center">
        <div class="tabsArea">
            <div class="title">个人中心</div>
            <ul class="tabs">
                <li v-for="item in tabs.list" @click="changeTab(item.id)" :class="{'active': item.id === tabs.active}" :key="item.id">{{ item.name }}</li>
            </ul>
        </div>
        <div class="main">
            <MyPublish v-if="tabs.active === 0" />
            <Drafts v-if="tabs.active === 1" />
            <UserSet v-if="tabs.active === 2" />
          <PublishControl v-if="tabs.active === 4" />
          <UserSet v-if="tabs.active === 3" />
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useUser } from '../../stores/useLogin'
import MyPublish from './MyPublish/index.vue'
import UserSet from './UserSet/index.vue'
import Drafts from './Drafts/index.vue'

const User = useUser()


const tabs = reactive({
    list:[
        {
            id:0,
            name:'我发布的'
        },
        {
            id:1,
            name:'草稿箱'
        },
        {
            id:2,
            name:'用户设置'
        },
      {
        id:3,
        name:'管理员设置'
      },
      {
        id:4,
        name:'文章设置'
      }
    ],
    active:0
})

//改变标签页
const changeTab = (id) => {
    tabs.active = id
}

</script>

<style scoped lang='less'>
.center{
    margin-top: 10px;
    display: flex;
    justify-content: space-between;

    .tabsArea{
        width: 15%;
        height: 800px;

        .title{
            background-color: #fff;
            opacity:90%;
            text-align: center;
            padding:20px 0;
            color:#444;
            font-weight: bold;
        }

        .tabs{
            margin-top: 10px;
            background-color: #fff;
            opacity:90%;
            text-align: center;
            li{
                padding:20px 0;
                color:#444;
                border-bottom: 1px solid #e6e6e6;
                cursor: pointer;
            }

            .active{
                color:#444;
                font-weight: bold;
                letter-spacing: 5px;
                background-color: #58ebff;
                opacity:90%;
                transition: 0.3s;
            }
        }
    }

    .main{
        width: 84%;
        height: 800px;
        background-color: #fff;
    }
}
</style>