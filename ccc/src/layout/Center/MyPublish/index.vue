<template>
    <div class="myPublish">
        <!-- 我的发布列表 -->
        <div class="title">My ~ Publish</div>
        <ul>
            <li v-for="item in publish.list">
                <el-descriptions class="margin-top" :column="3" border>
                    <el-descriptions-item span="2" label="标题">{{item.title}}</el-descriptions-item>
                    <el-descriptions-item span="1" label="作者">{{item.author}}</el-descriptions-item>
                    <el-descriptions-item span="2" label="时间">{{ moment(item.createTime).format('YYYY年MM月DD日 hh时mm分ss秒') }}</el-descriptions-item>
                    <el-descriptions-item span="1" label="操作">
                        <el-button type="text" @click="check(item)">查看</el-button>
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
                <el-descriptions-item span="2" label="时间">{{ moment(current.article.createTime).format('YYYY年MM月DD日 hh时mm分ss秒') }}</el-descriptions-item>
                <el-descriptions-item span="1" label="标签">{{current.article.tag}}</el-descriptions-item>
            </el-descriptions>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { mypublish } from '@/assets/data/articleData'
import moment from 'moment'
import { ElMessage, ElMessageBox } from 'element-plus'

const publish = reactive({
    list:[]
})


//当前对话框文章
const current = reactive({
    article:{}
})

//查看对话框
const isCheckDialog = ref(false)


//查看
const check = (item) => {
    console.log(item)
    isCheckDialog.value = true
    current.article = item
}

//删除
const deleteArticle = (id) => {

    console.log(id);

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
            console.log(item.id);
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

onMounted(()=>{
    publish.list = mypublish
})

</script>

<style scoped lang='less'>
.myPublish{
    padding:20px;

    ul{
        li{
            padding:20px 0;
        }
    }

    .title{
        font-size: 20px;
    }
}
</style>