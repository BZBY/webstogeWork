<template>
  <!-- 用户主页 -->
  <div class="center">
    <div class="main">
      <component :is="getCurrentComponent()" />
    </div>
    <div class="bottomNav">
      <ul class="tabs">
        <li v-for="item in tabs.list" @click="changeTab(item.id)" :class="{'active': item.id === tabs.active}" :key="item.id">
          <template v-if="shouldDisplayTab(item.id)">
            {{ item.name }}
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useUser } from '../../stores/useLogin'
import MyPublish from './MyPublish/index.vue'
import UserSet from './UserSet/index.vue'
import Drafts from './Drafts/index.vue'
import AdminSettings from './AdminSettings/index.vue'
import PublishControl from './PublishControl/index.vue'

const User = useUser()

const tabs = reactive({
  list: [
    {
      id: 0,
      name: '我发布的'
    },
    {
      id: 2,
      name: '用户设置'
    },
    {
      id: 3,
      name: '管理员设置'
    },
    {
      id: 4,
      name: '文章设置'
    }
  ],
  active: 0
})

// 改变标签页
const changeTab = (id) => {
  tabs.active = id
}

// 获取当前组件
const getCurrentComponent = () => {
  switch (tabs.active) {
    case 0:
      return MyPublish
    case 1:
      return Drafts
    case 2:
      return UserSet
    case 3:
      return isAdmin() ? AdminSettings : null
    case 4:
      return isAdmin() ? PublishControl : null
    default:
      return null
  }
}

// 判断是否应该显示特定的标签页
const shouldDisplayTab = (id) => {
  if ((id === 3 || id === 4) && !isAdmin()) {
    return false
  }
  return true
}

// 判断当前用户是否为管理员
const isAdmin = () => {
  const currentUser = JSON.parse(localStorage.getItem('NowUser'))
  const UsersALLs = JSON.parse(localStorage.getItem('UsersALL'))
  const matchedUser = UsersALLs.find(user => user.username === currentUser.username)
  return matchedUser && matchedUser.isAdmin === 1
}

</script>

<style scoped lang="less">
.center {
  position: relative;
  min-height: 100vh;
}

.main {
  padding-bottom: 60px; /* 预留底部导航栏高度 */
}

.bottomNav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #fff;
}

.tabs {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  padding: 0;
  margin: 0;
  list-style-type: none;
}

.tabs li {
  flex: 1;
  text-align: center;
  padding: 10px 0;
  color: #444;
  cursor: pointer;
}

.tabs li.active {
  color: #fff;
  background-color: #58ebff;
}
</style>
