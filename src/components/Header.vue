<template>
  <div class="container">
    <!-- 头部信息 -->
    <div class="top" :style="{'background-color': Day.day ? '#000' : ''}">
      <div class="title">
        <img src="../assets/images/icon.jpg" alt="" /> &nbsp; Blog
      </div>
      <div class="desc">
        <span class="username" v-if="currentUser" @click="goToUserCenter">{{ username }}</span>


        <span class="menu-icon" @click="toggleMenu">
      <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
        <path d="M901.632 896H122.368c-30.72 0-55.808-25.088-55.808-55.808v-1.536c0-30.72 25.088-55.808 55.808-55.808h779.776c30.72 0 55.808 25.088 55.808 55.808v1.536c-0.512 30.72-25.6 55.808-56.32 55.808zM901.632 568.32H122.368c-30.72 0-55.808-25.088-55.808-55.808v-1.536c0-30.72 25.088-55.808 55.808-55.808h779.776c30.72 0 55.808 25.088 55.808 55.808v1.536c-0.512 30.72-25.6 55.808-56.32 55.808zM901.632 240.64H122.368c-30.72 0-55.808-25.088-55.808-55.808v-1.536c0-30.72 25.088-55.808 55.808-55.808h779.776c30.72 0 55.808 25.088 55.808 55.808v1.536c-0.512 30.72-25.6 55.808-56.32 55.808z"></path>
      </svg>


    </span>
      </div>
      <div class="date">{{ moment(nowDate).format("YYYY年MM月DD日") }}</div>
    </div>
    <!-- 导航栏 -->
    <div class="nav" :class="{ open: showMenu }">
      <div class="nav-title">
        <span class="title-text">Coding's Blog</span>
        <span class="menu-icon2" @click="toggleMenu">返回</span>
      </div>
      <transition name="slide">
        <div class="menu-list" v-show="showMenu">
          <ul>
            <li :key="item.id" :class="{ activeLi: currentId == item.id }" v-for="item in menuList" @click="toPage(item)">
              {{ item.content }}
            </li>
            <li v-if="currentUser" @click="logout">退出登录</li>
          </ul>
        </div>
      </transition>
    </div>
    <div class="nav-background" :class="{ open: showMenu }"></div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import moment from "moment";
import { useStore } from "@/stores/useStore";
import { useRouter } from "vue-router";

// 路由器
const router = useRouter();

const currentId = ref(0);
const Day = useStore();
const currentUser = JSON.parse(localStorage.getItem('NowUser'));
const UsersALLs = JSON.parse(localStorage.getItem('UsersALL'));
const username = ref(currentUser ? currentUser.nickname : '');
if (currentUser && !username.value) {
  const user = UsersALLs.find((user) => user.username === currentUser.username);
  if (user) {
    username.value = user.nickname;
  }
}
// 当前日期
const nowDate = ref(new Date());

// 菜单列表
const menuList = reactive([
  {
    id: 0,
    content: "首页",
    path: "/",
  },
  {
    id: 1,
    content: "发表",
    path: "/myCreate",
  },
  {
    id: 20,
    content: "个人中心",
    path: "/userCenter",
  },
  {
    id: 3,
    content: "聊天室",
    path: "/about",
  },
  {
    id: 2,
    content: "最新发布",
    path: "/note",
  },
]);

// 显示菜单
const showMenu = ref(false);
const goToUserCenter = () => {
  router.push('/userCenter');
};

// 切换菜单显示
const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

// 跳转页面
const toPage = (item) => {
  currentId.value = item.id;
  router.push(item.path);
  toggleMenu();
};

// 退出登录
const logout = () => {
  localStorage.removeItem('NowUser');
  router.push('/login');
};
</script>


<style scoped>
.container {
  position: relative;
  height: 70px;
  overflow: hidden;
}

.top {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  z-index: 999;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
}

.title {
  font-size: 20px;
  display: flex;
  align-items: center;
  color: #1b00f1;
}

.title img {
  width: 50px;
  height: 50px;
}

.desc {
  margin-left: 30px;
}

.date {
  color: #004afa;
  font-weight: bold;
  font-size: large;
}

.nav {
  position: fixed;
  top: 70px;
  right: 0;
  width: 0;
  height: calc(100vh - 70px);
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 999;
  overflow-y: auto;
  transition: width 0.3s, background-color 0.3s;
}

.nav.open {
  width: 50%;
}

.menu-list {
  background-color: #fff;
  height: 100%;
  padding: 20px;
  color: #000;
  font-size: 18px;
}

.menu-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-list li {
  padding: 10px 0;
  cursor: pointer;
  transition: 0.4s;
}

.menu-list li.activeLi {
  font-weight: bold;
}

.menu-icon {
  font-size: 18px;
  color: black;
  cursor: pointer;
  position: fixed;
  bottom: 8%;
  right:5%;
  z-index: 999;
  padding: 2px;

  background:white;
}

.menu-icon2 {
  font-size: 18px;
  color: white;
  cursor: pointer;
  padding:10px;
  z-index: 999;
}



.nav-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  cursor: pointer;
}

.nav-title .title-text {
  font-size: 18px;
  color: #fff;
}

.nav-background {
  position: fixed;
  top: 70px;
  left: 0;
  width: 100%;
  height: calc(100vh - 70px);
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 998;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0s linear 0.3s;
}

.nav-background.open {
  opacity: 1;
  visibility: visible;
  transition: opacity 0.3s;
}

.nav-background.close {
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0s linear 0.3s;
}

.slide-enter-active {
  animation: slideEnter 2s;
}

.slide-leave-active {
  animation: slideLeave 2s;
}

@keyframes slideEnter {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideLeave {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}
</style>

