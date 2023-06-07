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
          <div class="scroll-container">
            <el-form ref="formRef" :model="User.userinfo" :rules="rules" :label-position="left" label-width="100px">
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
              <div class="scroll-container">
                <el-form ref="passwordFormRef" :model="User.userinfo" :rules="passwordRules" label-width="100px">
                  <el-form-item label="原密码" prop="oldPassword">
                    <el-input v-model="User.userinfo.oldPassword" type="password" />
                  </el-form-item>
                  <el-form-item label="修改密码" prop="password">
                    <el-input v-model="User.userinfo.password" type="password" />
                  </el-form-item>
                  <el-form-item label="确认密码" prop="confirmPassword">
                    <el-input v-model="User.userinfo.confirmPassword" type="password" />
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" style="margin-top:10px" @click="modifyPsd">修改密码</el-button>
                  </el-form-item>


                </el-form>
              </div>
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
const formRef = ref(null)
const passwordFormRef = ref(null)
const rules = {
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 7, message: '昵称长度为2~7个字符', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3456789]\d{9}$/, message: '请输入有效的中国手机号', trigger: 'blur' }
  ]
}
const passwordRules = {
  oldPassword: [
    { required: true, message: '请输入原密码', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度为6~15位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' }
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
  formRef.value.validate((valid) => {
    if (valid) {
      const currentUser = JSON.parse(localStorage.getItem('NowUser'))
      if (currentUser) {
        currentUser.nickname = User.userinfo.nickname
        currentUser.phone = User.userinfo.phone
        currentUser.gender = User.userinfo.gender
        localStorage.setItem('NowUser', JSON.stringify(currentUser))
        // 更新与当前用户账号相同的其他用户信息
        const users = JSON.parse(localStorage.getItem('UsersALL'))
        if (users) {

          users.forEach((user) => {
            if (user.username === currentUser.username) {

              user.nickname = User.userinfo.nickname
              user.phone = User.userinfo.phone
              user.gender = User.userinfo.gender
            }
          })
          localStorage.setItem('UsersALL', JSON.stringify(users))
        }


        ElMessage.success('保存修改')
      } else {
        ElMessage.error('用户不存在')
      }
    } else {
      ElMessage.error('保存失败，请检查输入')
    }
  })
}

const modifyPsd = () => {
  passwordFormRef.value.validate((valid) => {
    if (valid) {
      if (User.userinfo.password === User.userinfo.confirmPassword) {
        const currentUser = JSON.parse(localStorage.getItem('NowUser'))
        if (currentUser) {
          if (User.userinfo.oldPassword === currentUser.password) {
            currentUser.password = User.userinfo.password
            localStorage.setItem('NowUser', JSON.stringify(currentUser))
            // 更新与当前用户账号相同的其他用户的密码
            const users = JSON.parse(localStorage.getItem('UsersALL'))
            if (users) {
              users.forEach((user) => {
                if (user.username === currentUser.username) {
                  user.password = User.userinfo.password
                }
              })
              localStorage.setItem('UsersALL', JSON.stringify(users))
            }

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
    } else {
      ElMessage.error('密码修改失败，请检查输入')
    }
  })
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

  .scroll-container {
    height: 300px;
    overflow-y: auto;
  }
}
</style>