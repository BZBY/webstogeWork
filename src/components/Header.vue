<template>
  <!-- 头部信息 -->
  <div class="top" :style="{'background-color': Day.day ? '#000' : ''}">
    <div class="wrap">
      <div class="title">
        <img src="../assets/images/icon.jpg" alt="" /> &nbsp; Coding ' s Blog
      </div>
      <div class="desc"> ~~~~~~ </div>
    </div>
    <div class="date">{{ moment(nowDate).format("YYYY年MM月DD日") }}</div>
  </div>
  <!-- 导航栏 -->
  <div class="nav" :style="{'background-color': Day.day ? '#000' : ''}">
    <ul>
      <li
          v-for="item in menuList"
          :key="item.id"
          :class="{ activeLi: currentId == item.id }"
          @click="toPage(item)"
      >
        {{ item.content }}
      </li>
    </ul>
    <div class="user" v-if="User.isLogin">
      <el-tooltip
          class="box-item"
          effect="dark"
          content="用户主页"
          placement="bottom"
      >
        <li
            v-for="item in center"
            :key="item.id"
            :class="{ activeLi: currentId == item.id }"
            @click="toPage(item)"
        >
          <span>{{ User.userinfo.username }}</span>
        </li>
      </el-tooltip>

      <el-tooltip
          class="box-item"
          effect="dark"
          content="退出登录"
          placement="bottom"
      >
        <div @click="exit">
          <svg
              t="1673789199312"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3494"
              width="22"
              height="22"
          >
            <path
              d="M909.7728 517.376L746.3424 369.664a33.9456 33.9456 0 0 0-45.7728 0 26.7264 26.7264 0 0 0 0 41.3696L808.448 508.5184H494.592c-19.5584 0-32.6656 11.8272-32.6656 29.5424 0 17.7664 13.1072 29.5424 32.7168 29.5424H808.448L700.5696 665.1392a26.7264 26.7264 0 0 0 0 41.3696 31.1808 31.1808 0 0 0 22.8864 8.8576 31.232 31.232 0 0 0 22.8864-8.8576l163.4304-150.6816s0-2.9696 3.2768-2.9696a22.784 22.784 0 0 0-3.2768-35.4816z"
              p-id="3495"
              fill="#e8e8e8"
            ></path>
            <path
              d="M102.4 827.1872C102.4 880.6912 145.664 921.6 202.24 921.6h566.016c56.576 0 99.84-40.9088 99.84-94.4128v-62.976c0-18.8416-13.312-31.4368-33.28-31.4368s-33.28 12.5952-33.28 31.488v62.976c0 18.8416-13.312 31.4368-33.28 31.4368H202.24c-19.968 0-33.28-12.5952-33.28-31.488V197.8368c0-18.8928 13.312-31.488 33.28-31.488h565.9648c19.968 0 33.28 12.5952 33.28 31.488v62.9248c0 18.8928 13.312 31.488 33.28 31.488s33.28-12.5952 33.28-31.488v-62.976C868.096 144.384 824.832 103.424 768.256 103.424H202.24C145.664 103.424 102.4 144.3328 102.4 197.8368"
              p-id="3496"
              fill="#e8e8e8"
            ></path>
          </svg>
        </div>
      </el-tooltip>
    </div>
    <ul v-else>
      <li
          v-for="item in login"
          :key="item.id"
          :class="{ activeLi: currentId == item.id }"
          @click="toPage(item)"
      >
        {{ item.content }}
      </li>
    </ul>
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
]);

// 登录和注册
const login = reactive([
  {
    id: 4,
    content: "登录",
    path: "/login",
  },
  {
    id: 5,
    content: "注册",
    path: "/register",
  },
]);

// 个人中心
const center = reactive([
  {
    id: 6,
    content: "",
    path: "/userCenter",
  },
]);

// 跳转页面
const toPage = (item) => {
  currentId.value = item.id;
  router.push({ path: item.path });
};

// 退出登录
const exit = () => {
  localStorage.removeItem("NowUser");
  User.isLogin = false;
  User.userinfo = null;
  router.push("/");
};

// 从 Web Storage 中读取用户信息
const userFromStorage = localStorage.getItem("NowUser");
const User = reactive({
  isLogin: !!userFromStorage,
  userinfo: userFromStorage ? JSON.parse(userFromStorage) : null,
});

// 格式化日期
function clickEffect() {
  let balls = [];
  let longPressed = false;
  let longPress;
  let multiplier = 0;
  let width, height;
  let origin;
  let normal;
  let ctx;
  const colours = ["#F73859", "#14FFEC", "#00E0FF", "#FF99FE", "#FAF15D"];
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);
  canvas.setAttribute("style", "width: 100%; height: 100%; top: 0; left: 0; z-index: 99999; position: fixed; pointer-events: none;");
  const pointer = document.createElement("span");
  pointer.classList.add("pointer");
  document.body.appendChild(pointer);

  if (canvas.getContext && window.addEventListener) {
    ctx = canvas.getContext("2d");
    updateSize();
    window.addEventListener('resize', updateSize, false);
    loop();
    window.addEventListener("mousedown", function(e) {
      pushBalls(randBetween(10, 20), e.clientX, e.clientY);
      document.body.classList.add("is-pressed");
      longPress = setTimeout(function() {
        document.body.classList.add("is-longpress");
        longPressed = true;
      }, 500);
    }, false);
    window.addEventListener("mouseup", function(e) {
      clearInterval(longPress);
      if (longPressed == true) {
        document.body.classList.remove("is-longpress");
        pushBalls(randBetween(50 + Math.ceil(multiplier), 100 + Math.ceil(multiplier)), e.clientX, e.clientY);
        longPressed = false;
      }
      document.body.classList.remove("is-pressed");
    }, false);
    window.addEventListener("mousemove", function(e) {
      let x = e.clientX;
      let y = e.clientY;
      pointer.style.top = y + "px";
      pointer.style.left = x + "px";
    }, false);
  } else {
    console.log("canvas or addEventListener is unsupported!");
  }


  function updateSize() {
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.scale(2, 2);
    width = (canvas.width = window.innerWidth);
    height = (canvas.height = window.innerHeight);
    origin = {
      x: width / 2,
      y: height / 2
    };
    normal = {
      x: width / 2,
      y: height / 2
    };
  }
  class Ball {
    constructor(x = origin.x, y = origin.y) {
      this.x = x;
      this.y = y;
      this.angle = Math.PI * 2 * Math.random();
      if (longPressed == true) {
        this.multiplier = randBetween(14 + multiplier, 15 + multiplier);
      } else {
        this.multiplier = randBetween(6, 12);
      }
      this.vx = (this.multiplier + Math.random() * 0.5) * Math.cos(this.angle);
      this.vy = (this.multiplier + Math.random() * 0.5) * Math.sin(this.angle);
      this.r = randBetween(8, 12) + 3 * Math.random();
      this.color = colours[Math.floor(Math.random() * colours.length)];
    }
    update() {
      this.x += this.vx - normal.x;
      this.y += this.vy - normal.y;
      normal.x = -2 / window.innerWidth * Math.sin(this.angle);
      normal.y = -2 / window.innerHeight * Math.cos(this.angle);
      this.r -= 0.3;
      this.vx *= 0.9;
      this.vy *= 0.9;
    }
  }

  function pushBalls(count = 1, x = origin.x, y = origin.y) {
    for (let i = 0; i < count; i++) {
      balls.push(new Ball(x, y));
    }
  }

  function randBetween(min, max) {
    return Math.floor(Math.random() * max) + min;
  }

  function loop() {
    ctx.fillStyle = "rgba(255, 255, 255, 0)";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < balls.length; i++) {
      let b = balls[i];
      if (b.r < 0) continue;
      ctx.fillStyle = b.color;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2, false);
      ctx.fill();
      b.update();
    }
    if (longPressed == true) {
      multiplier += 0.2;
    } else if (!longPressed && multiplier >= 0) {
      multiplier -= 0.4;
    }
    removeBall();
    requestAnimationFrame(loop);
  }

  function removeBall() {
    for (let i = 0; i < balls.length; i++) {
      let b = balls[i];
      if (b.x + b.r < 0 || b.x - b.r > width || b.y + b.r < 0 || b.y - b.r > height || b.r < 0) {
        balls.splice(i, 1);
      }
    }
  }
}
clickEffect();//调用

</script>

<style scoped lang="less">
.top {
  display: flex;
  text-align: center;
  padding: 10px;
  background-image: url("../assets/3.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 180px;
  width: 100%;
  font-size: 14px;
  opacity: 80%;
  color: #444;
  .wrap {
    display: flex;
    align-items: center;
  }
  .title {
    font-size: 23px;
    display: flex;
    align-items: center;
    color: #1b00f1;
    img {
      width: 50px;
      height: 50px;
    }
    position: absolute;
  }

  .desc {
    margin-left: 30px;
  }
  .date {
    color: #004afa;
    position: relative;
    left: 80%;
    top: 45%;
    font-weight: bold;
    font-size: large;
  }

  div {
    margin-top: 0px;
  }
}
.nav {
  padding: 10px;
  background-color: #4362d7;
  color: #cdcdcd;
  display: flex;
  justify-content: space-between;
  ul {
    display: flex;
    li {
      padding: 0 20px;
      cursor: pointer;
      transition: 0.4s;
    }
    li:hover {
      color: #fff;
    }
    .activeLi {
      color: #fff;
      font-weight: 400;
    }
  }

  .user {
    display: flex;
    li,
    div {
      cursor: pointer;
      padding: 0 10px;
      span {
        color: #e8e8e8;
      }
    }
  }
}
</style>
