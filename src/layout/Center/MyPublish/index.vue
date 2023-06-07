<template>
  <div class="myPublish">
    <!-- 我的发布列表 -->
    <div class="title">My ~ Publish</div>
    <ul>
      <li v-for="item in mypublish.list" :key="item.id">

        <div class="item-container">
        <el-descriptions class="margin-top" :column="3" border>
          <el-descriptions-item span="2" label="标题">
            <a :href="getArticleDetailLink(item.id)">{{ item.title }}</a>
          </el-descriptions-item>
          <el-descriptions-item span="1" label="作者">{{ item.author }}</el-descriptions-item>
          <el-descriptions-item span="2" label="时间">
            {{ moment(item.createTime).format('YYYY.MM.DD hh:mm:ss') }}
          </el-descriptions-item>
          <el-descriptions-item span="1" label="操作">
            <el-button type="text" @click="deleteArticle(item.id)">删除</el-button>
          </el-descriptions-item>
        </el-descriptions>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import moment from 'moment'
import { ElMessage, ElMessageBox } from 'element-plus'

const articles = JSON.parse(localStorage.getItem('articles')) || []

const currentUser = JSON.parse(localStorage.getItem('NowUser')) || {}

const mypublish = reactive({
  list: []
})

// 当前对话框文章
const current = reactive({
  article: {}
})

// 删除
const deleteArticle = (id) => {
  ElMessageBox.confirm('确定删除该博文吗？', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
      .then(() => {
        mypublish.list = mypublish.list.filter((item) => {
          return item.id !== id
        })
        // 从localStorage中删除对应数据
        const updatedArticles = articles.filter((item) => item.id !== id)
        localStorage.setItem('articles', JSON.stringify(updatedArticles))

        ElMessage({
          type: 'success',
          message: '删除成功'
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消'
        })
      })
}

// 获取文章详情链接
const getArticleDetailLink = (id) => {
  return `articleDetial?id=${id}`
}

onMounted(() => {
  mypublish.list = articles.filter((item) => item.author === currentUser.username)
})
</script>

<style scoped lang="less">
.myPublish {
  background-color: #fff;
  padding: 20px;
  height: auto;
  ul {
    li {
      padding: 20px 0;

      .item-container {
        display: flex;
        align-items: center;

        .el-descriptions {
          flex: 1;
        }

        .el-descriptions-item:last-child {
          margin-left: auto;
        }
      }
    }
  }
  .title {
    font-size: 20px;
  }
}
</style>
