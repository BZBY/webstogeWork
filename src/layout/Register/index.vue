<template>
  <div class="register">
    <h2>注册账号</h2>
    <div class="box">
      <form @submit.prevent="submitReg">
        <div class="form-group">
          <label for="username">用户名</label>
          <input v-model="register.username" type="text" id="username" required pattern="[A-Za-z0-9]+" title="账号必须是英文数字组合">
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input v-model="register.password" type="password" id="password" required minlength="6" maxlength="15" title="密码必须6~15位数">
        </div>
        <div class="form-group">
          <label for="repassword">确认密码</label>
          <input v-model="register.repassword" type="password" id="repassword" required :pattern="register.password" title="密码不一致">
        </div>
        <div class="form-group">
          <label for="nickname">昵称</label>
          <input v-model="register.nickname" type="text" id="nickname" required minlength="2" maxlength="7" title="昵称必须2~7字符">
        </div>
        <div class="form-group">
          <label for="gender">性别</label>
          <select v-model="register.gender" id="gender" required>
            <option value="0">女</option>
            <option value="1">男</option>
          </select>
        </div>
        <div class="form-group">
          <label for="phone">手机</label>
          <input v-model="register.phone" type="text" id="phone" required pattern="^1[3456789]\d{9}$" title="手机号必须满足中国大陆手机号">
        </div>
        <div class="form-buttons">
          <button type="submit">注册</button>
          <button type="button" @click="reset">重置</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      register: {
        username: '',
        password: '',
        repassword: '',
        gender: '0',
        phone: '',
        nickname: ''
      }
    }
  },
  created() {
    this.autoRegisterAdmin()
  },
  methods: {
    autoRegisterAdmin() {
      const users = JSON.parse(localStorage.getItem('UsersALL')) || []

      // 检查是否已存在 admin 账号
      const adminUser = users.find(user => user.username === 'admin')
      if (adminUser) {
        return // admin 账号已存在，无需注册
      }

      // 创建 admin 账号
      const admin = {
        username: 'admin',
        password: 'admin',
        gender: '',
        phone: '',
        nickname: '',
        isAdmin: '1'
      }

      // 添加到用户列表
      users.push(admin)

      // 更新本地存储
      localStorage.setItem('UsersALL', JSON.stringify(users))
    },
    reset() {
      this.register = {
        username: '',
        password: '',
        repassword: '',
        gender: '0',
        phone: '',
        nickname: ''
      }
    },
    submitReg() {
      const users = JSON.parse(localStorage.getItem('UsersALL')) || []

      // 检查用户名是否重复
      const existingUser = users.find(user => user.username === this.register.username)
      if (existingUser) {
        alert('该用户名已存在')
        return
      }

      // 创建新用户
      const newUser = {
        username: this.register.username,
        password: this.register.password,
        repassword: this.register.repassword,
        gender: this.register.gender,
        phone: this.register.phone,
        nickname: this.register.nickname,
        isAdmin: '0' // 默认为普通用户
      }

      // 添加到用户列表
      users.push(newUser)

      // 更新本地存储
      localStorage.setItem('UsersALL', JSON.stringify(users))

      alert('注册成功')

      // 清空表单数据
      this.reset()

      // 设置当前登录用户
      this.updateNowUser(newUser.username, newUser.isAdmin, newUser.nickname)


      // 获取当前页面的根路径
      const rootPath = window.location.origin

      // 跳转到根路径
      window.location.href = rootPath
    },
    updateNowUser(username, isAdmin,nickname) {
      const nowUser = {
        username: username,
        isAdmin: isAdmin,
        nickname:nickname
      }
      localStorage.setItem('NowUser', JSON.stringify(nowUser))
    }
  }
}
</script>

<style scoped>
.register {
  width: 100%;
  background-color: #fff;
  margin-top: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.box {
  margin-top: 20px;
  width: 100%;
  max-width: 500px;
  padding: 20px;
  border: 1px solid #ccc;
}

h2 {
  color: #666;
  margin-bottom: 20px;
  text-align: center;
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
input[type="password"],
select {
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
</style>
