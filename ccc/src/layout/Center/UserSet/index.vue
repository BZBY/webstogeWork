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
                    <el-form :label-position="left" label-width="100px" :model="User.userinfo">
                        <el-form-item label="昵称">
                            <el-input v-model="User.userinfo.nickname" />
                        </el-form-item>
                        <el-form-item label="手机">
                            <el-input v-model="User.userinfo.phone" />
                        </el-form-item>


                        <el-form-item label="性别">
                            <el-radio-group v-model="User.userinfo.gender">
                                <el-radio label="0" size="large">女</el-radio>
                                <el-radio label="1" size="large">男</el-radio>
                            </el-radio-group>
                        </el-form-item>
                      <el-form-item label="职业">
                        <el-input v-model="User.userinfo.work" />
                      </el-form-item>
                      <el-form-item label="地址">
                        <el-input v-model="User.userinfo.address" />
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
                                <el-form-item label="修改密码">
                                    <el-input v-model="User.userinfo.password" type="password" />
                                </el-form-item>
                                <el-form-item label="确认密码">
                                    <el-input v-model="User.userinfo.repassword" type="password" />
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" style="margin-top:10px" @click="modifyPsd">修改密码</el-button>
                                </el-form-item>
                            </el-form>
                        </el-collapse-item>


                      <el-collapse-item title="找回密码" name="1">
                        <el-form label-width="100px">
                          <el-form-item label="输入手机号">
                            <el-input v-model="User.userinfo.password" type="password" />
                          </el-form-item>
                          <el-form-item label="确认验证码">
                            <el-input v-model="User.userinfo.repassword" type="password" />
                          </el-form-item>
                          <el-form-item>
                            <el-button type="primary" style="margin-top:10px" @click="modifyPsd">确认</el-button>
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
import { ref, reactive } from 'vue'
import { useUser } from '@/stores/useLogin'
import { ElMessage } from 'element-plus'

const User = useUser()

const saveModify = () => {
    ElMessage.success('保存修改')
}

const modifyPsd = () => {
    ElMessage.success('修改成功')
}

</script>

<style scoped lang='less'>
.userSet {
    padding: 20px;

    .title {
        font-size: 20px;
    }

    .sets {
        width: 100%;
        margin-top: 30px;
    }

    .safe{
        margin-top: 30px;
    }
}
</style>