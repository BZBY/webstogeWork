<template>
  <div class="login">
    <div style="color:#666">登录您的账号以享受全部服务</div>
    <div class="box">
      <el-form label-position="top" label-width="100px" :model="login" style="max-width: 460px">
        <el-form-item label="用户名">
          <el-input v-model="login.username" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="login.password" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitLogin">登录</el-button>
          <el-button type="info" @click="toReg">没有账号</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
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
    ElMessage.error('请正确输入账号密码')
    return
  }

  const isAdmin = login.value.username === adminUsername && login.value.password === adminPassword

  if (isAdmin) {
    ElMessage.success('管理员登录成功')
    // 设置管理员登录状态
    // 进行相应的处理
    // 将登录后的账户数据存储到 Web Storage 中
    const currentUser = { username: login.value.username, password: login.value.password }
    localStorage.setItem('NowUser', JSON.stringify(currentUser))
    // 获取当前页面的根路径
    const rootPath = window.location.origin
    // 跳转到根路径
    window.location.href = rootPath
    return
  }

  const storedUser = JSON.parse(localStorage.getItem('currentUser'))

  if (storedUser && storedUser.username === login.value.username && storedUser.password === login.value.password) {
    ElMessage.success('登录成功，欢迎您~' + storedUser.username)
    // 设置用户登录状态
    // 进行相应的处理
    // 将登录后的账户数据存储到 Web Storage 中
    const currentUser = { username: login.value.username, password: login.value.password }
    localStorage.setItem('NowUser', JSON.stringify(currentUser))
    // 获取当前页面的根路径
    const rootPath = window.location.origin
    // 跳转到根路径
    window.location.href = rootPath
    return
  } else {
    ElMessage.error('账号或密码错误')
  }
}

// 跳转到注册页面
const toReg = () => {
  router.push({ path: '/register' })
}

// 注册
const registerUser = () => {
  if (login.value.username === adminUsername) {
    ElMessage.error('注册失败，用户名不可用')
    return
  }

  const storedUser = JSON.parse(localStorage.getItem('currentUser'))

  if (storedUser && storedUser.username === login.value.username) {
    ElMessage.error('注册失败，用户名已存在')
    return
  }

  // 注册逻辑
  const newUser = {
    username: login.value.username,
    password: login.value.password
  }

  localStorage.setItem('currentUser', JSON.stringify(newUser))
  ElMessage.success('注册成功')
  router.push({ path: '/login' })
}

onMounted(() => {
  // 清空本地存储的用户信息
  localStorage.removeItem('currentUser')
})
</script>

<style scoped lang="less">
.login {
  width: 100%;
  height: 800px;
  background-color: #fff;
  opacity: 90%;
  margin-top: 10px;
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: 30px;

  .box {
    margin-top: 20px;
    width: 500px;
    height: 300px;
    padding: 20px;
    border: 1px solid #ccc;
  }
}
</style>
