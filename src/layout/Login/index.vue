<template>
  <div class="login">
    <div class="box">
      <form @submit.prevent="submitLogin" style="max-width: 460px">
        <div class="form-group">
          <label for="username">用户名</label>
          <input v-model="login.username" type="text" id="username" />
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input v-model="login.password" type="password" id="password" />
        </div>
        <div class="form-buttons">
          <button type="submit">登录</button>
          <button type="button" @click="toReg">没有账号</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const adminUsername = 'admin'
const adminPassword = 'admin'

const router = useRouter()

// 登录表单
const login = ref({
  username: '',
  password: ''
})

// 登录
const submitLogin = () => {
  if (login.value.username === '' || login.value.password === '') {
    alert('请正确输入账号密码')
    return
  }

  const isAdmin = login.value.username === adminUsername && login.value.password === adminPassword

  if (isAdmin) {
    alert('管理员登录成功')
    const currentUser = { username: login.value.username, password: login.value.password }
    localStorage.setItem('NowUser', JSON.stringify(currentUser))
    const rootPath = window.location.origin
    window.location.href = rootPath
    return
  }

  const UsersALL = JSON.parse(localStorage.getItem('UsersALL'))

  const storedUser = UsersALL.find(user => user.username === login.value.username)

  if (storedUser && storedUser.password === login.value.password) {
    alert('登录成功，欢迎您~' + storedUser.username)
    const currentUser = { username: login.value.username, password: login.value.password }
    localStorage.setItem('NowUser', JSON.stringify(currentUser))
    const rootPath = window.location.origin
    window.location.href = rootPath
    return
  } else {
    alert('账号或密码错误')
  }
}

// 跳转到注册页面
const toReg = () => {
  router.push({ path: '/register' })
}

// 注册
const registerUser = () => {
  if (login.value.username === adminUsername) {
    alert('注册失败，用户名不可用')
    return
  }

  const UsersALL = JSON.parse(localStorage.getItem('UsersALL'))

  const storedUser = UsersALL.find(user => user.username === login.value.username)

  if (storedUser) {
    alert('注册失败，用户名已存在')
    return
  }

  // 注册逻辑
  const newUser = {
    username: login.value.username,
    password: login.value.password
  }

  UsersALL.push(newUser)
  localStorage.setItem('UsersALL', JSON.stringify(UsersALL))
  alert('注册成功')
  router.push({ path: '/login' })
}

onMounted(() => {
  localStorage.removeItem('currentUser')
})
</script>

<style scoped>
.login {
  width: 100%;
  height: 100vh;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  width: 90%;
  max-width: 460px;
  padding: 20px;
  border: 1px solid #ccc;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button[type="submit"],
button[type="button"] {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

button[type="button"] {
  background-color: #ccc;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
}
</style>
