<template>
    <div class="drafts">
        <!-- 草稿箱 -->
        <div class="title">草稿箱</div>
        <ul>
            <li v-for="item in dra.list" style="display:block">
                <el-descriptions class="margin-top" :column="3" border >
                    <el-descriptions-item span="2" label="标题" style="display:block">{{item.title}}</el-descriptions-item>
                    <el-descriptions-item span="1" label="作者" style="display:block">{{item.author}}</el-descriptions-item>
                     <el-descriptions-item span="1" label="操作" style="display:block">
                        <el-button type="text" @click="checkArticle(item)">查看</el-button>
                        <el-button type="text" @click="editArticle(item)">编辑</el-button>
                        <el-button type="text" @click="deleteArticle(item.id)">删除</el-button>
                    </el-descriptions-item>
                </el-descriptions>
            </li>
        </ul>

        <!-- 对话框 -->
        <el-dialog v-model="isCheckDialog" title="博文详情" width="80%">
            <el-descriptions class="margin-top" :column="3" border>
                <el-descriptions-item span="2" label="标题">{{current.article.title}}</el-descriptions-item>
                <el-descriptions-item span="1" label="作者">{{current.article.author}}</el-descriptions-item>
                <el-descriptions-item span="3" label="内容">{{current.article.content}}</el-descriptions-item>
            </el-descriptions>
        </el-dialog>

        <!-- 编辑 -->
        <el-dialog v-model="isEditDialog" title="编辑博文" width="80%">
            <el-descriptions class="margin-top" :column="3" border>
                <el-descriptions-item span="2" label="标题">
                    <el-input v-model="edit.article.title"></el-input>
                </el-descriptions-item>
                <el-descriptions-item span="1" label="作者">
                      <el-input v-model="edit.article.author"></el-input>
                </el-descriptions-item>
                <el-descriptions-item span="3" label="摘要">
                    <el-input v-model="edit.article.desc"></el-input>
                </el-descriptions-item>
                <el-descriptions-item span="2" label="时间">
                    <el-input v-model="edit.article.createTime"></el-input>
                </el-descriptions-item>
                <el-descriptions-item span="1" label="标签">
                    <el-input v-model="edit.article.tag"></el-input>
                </el-descriptions-item>
                <el-descriptions-item span="3" label="内容">
                    <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 15 }" v-model="edit.article.content"></el-input>
                </el-descriptions-item>
            </el-descriptions>
            <div class="btn">
                <el-button @click="save">保存</el-button>
                <el-button type="primary" @click="publish">发布</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { drafts } from '@/assets/data/articleData'
import moment from 'moment'
import { ElMessage, ElMessageBox } from 'element-plus'

const dra = reactive({
    list:[]
})

//显示对话框文章
const current = reactive({
    article:{}
})

//编辑对话框文章
const edit = reactive({
    article:{}
})

//查看对话框
const isCheckDialog = ref(false)
//编辑对话框
const isEditDialog = ref(false)

//查看
const checkArticle = (item) => {
    isCheckDialog.value = true
    current.article = item
}

//编辑
const editArticle = (item) => {
    isEditDialog.value = true
    edit.article = item
}

//删除
const deleteArticle = (id) => {

    ElMessageBox.confirm(
    '确定删除该博文吗？',
    'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    .then(() => {
        publish.list = publish.list.filter(item => {
            return item.id != id
        })
        ElMessage({
            type: 'success',
            message: '删除成功',
        })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消',
      })
    })
}

//保存
const save = () => {
    ElMessage.success('保存成功')
    isEditDialog.value = false
}

//发布
const publish = () => {
    ElMessage.success('发布成功')
    isEditDialog.value = false
}

onMounted(()=>{
    dra.list = drafts
})

</script>

<style scoped lang='less'>
.drafts{
    padding:20px;

    ul{
        li{
            padding:20px 0;
        }
    }

    .title{
        font-size: 20px;
    }

    .btn{
        margin-top: 20px;
        text-align: end;
    }
}
</style>