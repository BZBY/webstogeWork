<template>
  <div class="userSet">
    <div class="title">用户设置</div>
    <div class="sets">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>用户信息</span>
          </div>
        </template>
        <div>
          <el-form :label-position="left" label-width="100px" :model="User.userinfo" :rules="rules">
            <el-form-item label="昵称" prop="nickname">
              <el-input v-model="User.userinfo.nickname" />
            </el-form-item>
            <el-form-item label="手机" prop="phone">
              <el-input v-model="User.userinfo.phone" />
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="User.userinfo.gender">
                <el-radio label="0" size="large">女</el-radio>
                <el-radio label="1" size="large">男</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveModify">保存修改</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>

      <el-card class="safe">
        <template #header>
          <div class="card-header">
            <span>安全设置</span>
          </div>
        </template>
        <div>
          <el-collapse>
            <el-collapse-item title="密码" name="1">
              <el-form label-width="100px">
                <el-form-item label="原密码" prop="oldPassword">
                  <el-input v-model="oldPassword" type="password" />
                </el-form-item>
                <el-form-item label="修改密码" prop="newPassword">
                  <el-input v-model="User.userinfo.password" type="password" />
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPassword">
                  <el-input v-model="User.userinfo.repassword" type="password" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" style="margin-top:10px" @click="modifyPsd">修改密码</el-button>
                </el-form-item>
              </el-form>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUser } from '@/stores/useLogin'
import { ElMessage } from 'element-plus'

const User = useUser()
const oldPassword = ref('')
const rules = {
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 7, message: '昵称长度为2~7个字符', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3456789]\d{9}$/, message: '请输入有效的中国手机号', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度为6~15位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' }
  ],
  oldPassword: [
    { required: true, message: '请输入原密码', trigger: 'blur' }
  ]
}

onMounted(() => {
  const currentUser = JSON.parse(localStorage.getItem('NowUser'))
  if (currentUser) {
    User.userinfo.nickname = currentUser.nickname
    User.userinfo.phone = currentUser.phone
    User.userinfo.gender = currentUser.gender
  }
})

const saveModify = () => {
  ElMessage.success('保存修改')
}

const modifyPsd = () => {
  if (User.userinfo.password === User.userinfo.repassword) {
    const currentUser = JSON.parse(localStorage.getItem('NowUser'))
    if (currentUser) {
      if (oldPassword.value === currentUser.password) {
        currentUser.password = User.userinfo.password
        localStorage.setItem('NowUser', JSON.stringify(currentUser))
        ElMessage.success('修改成功')
      } else {
        ElMessage.error('原密码错误')
      }
    } else {
      ElMessage.error('用户不存在')
    }
  } else {
    ElMessage.error('确认密码与新密码不一致')
  }
}
</script>

<style scoped lang="less">
.userSet {
  padding: 20px;

  .title {
    font-size: 20px;
  }

  .sets {
    width: 100%;
    margin-top: 30px;
  }

  .safe {
    margin-top: 30px;
  }
}
</style>
