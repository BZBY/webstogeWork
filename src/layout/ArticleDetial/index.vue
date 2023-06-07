<template>
  <div class="articleDetail">
    <div class="left">
      <div class="title">
        {{ article.title }}

      </div>
      <div class="time">
        {{ moment(article.createTime).format('YYYY年MM月DD日 hh时mm分ss秒') }}
      </div>
      <div class="content">
        {{ article.content }}
      </div>
      <div class="info">
        <span>{{ article.author }}</span>
        <span>{{ article.tag }}</span>
        <span>ID:{{ article.id }}</span>
        <span>{{ article.readcount }}阅读数</span>
        <span>{{ article.likecount }}点赞数</span>
      </div>
      <el-divider></el-divider>
      <!-- 评论区 -->
      <div class="comments">
        <div v-for="comment in article.comments" :key="comment.timestamp" class="comment">
          <span class="username">{{ comment.nickname }}：</span>
          <span class="content">{{ comment.content }}</span>
        </div>
      </div>
      <el-form :model="commentForm" class="comment-form">
        <el-form-item>
          <el-input v-model="commentForm.content" type="textarea" placeholder="发表评论"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addComment" :disabled="!isUserLoggedIn">发表评论</el-button>
        </el-form-item>
      </el-form>
      <button @click="likeArticle" class="likeButton">{{ like ? '取消赞' : '赞赏' }}</button>
      <button v-if="isAuthor" @click="editArticle" class="editButton">编辑</button>
      <button v-if="isAuthor" @click="deleteArticle" class="deleteButton">删除</button>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import SideNew from '@/components/SideNew.vue'
import Comment from '../../components/comment.vue'
import moment from 'moment'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()

const article = reactive({
  id: 0,
  title: '',
  author: '',
  tag: '',
  desc: '',
  readcount: 0,
  likecount: 0,
  createTime: '',
  content: '',
  comments: []
})

const getArticle = () => {
  const articleData = JSON.parse(localStorage.getItem('articles'))
  if (articleData) {
    const { id } = route.query
    const foundArticle = articleData.find(item => item.id == id)
    if (foundArticle) {
      Object.assign(article, foundArticle)
      article.readcount++
      updateArticle(article)
    } else {
      ElMessage.error('未找到对应的文章')
    }
  } else {
    ElMessage.error('文章数据加载失败')
  }
}

const like = ref(false)

const likeArticle = () => {
  like.value = !like.value
  if (like.value) {
    ElMessage.success('已赞赏，文章将得到推荐')
    article.likecount++
    updateArticle(article)
  } else {
    article.likecount--
    updateArticle(article)
  }
}

const commentForm = reactive({
  content: ''
})

const addComment = () => {
  if (!isUserLoggedIn) {
    ElMessage.warning('请先登录')
    return
  }
  if (commentForm.content.trim() === '') {
    ElMessage.warning('评论内容不能为空')
    return
  }

  const currentUser = JSON.parse(localStorage.getItem('NowUser'))
  const newComment = {
    username: currentUser.username,
    content: commentForm.content,
    timestamp: new Date().getTime()
  }

  article.comments.push(newComment)
  updateArticle(article)

  commentForm.content = ''
}

const updateArticle = (updatedArticle) => {
  const articleData = JSON.parse(localStorage.getItem('articles'))
  const index = articleData.findIndex(item => item.id === updatedArticle.id)
  if (index !== -1) {
    articleData[index] = updatedArticle
    localStorage.setItem('articles', JSON.stringify(articleData))
  }
}

const isUserLoggedIn = ref(false)

onMounted(() => {
  getArticle()
  watch(() => route.query.id, () => {
    getArticle()
  })

  const currentUser = JSON.parse(localStorage.getItem('NowUser'))
  isUserLoggedIn.value = currentUser !== null
})

const isAuthor = ref(false)

watch(isUserLoggedIn, () => {
  if (isUserLoggedIn.value) {
    const currentUser = JSON.parse(localStorage.getItem('NowUser'))
    isAuthor.value = currentUser.nickname=== article.author
  } else {
    isAuthor.value = false
  }
})

const editArticle = () => {
  const tmpWords = {
    id: article.id,
    title: article.title,
    author: article.author,
    tag: article.tag,
    desc: article.desc,
    content: article.content
  }

  localStorage.setItem('tmpWords', JSON.stringify(tmpWords))
  localStorage.setItem('EditIs', '1')

  router.push('/myCreate')
}

const deleteArticle = () => {
  const articleData = JSON.parse(localStorage.getItem('articles'))
  const index = articleData.findIndex(item => item.id === article.id)
  if (index !== -1) {
    articleData.splice(index, 1)
    localStorage.setItem('articles', JSON.stringify(articleData))
    router.push('/')
  } else {
    ElMessage.error('删除失败，未找到对应的文章')
  }
}
</script>

<style scoped lang='less'>
.articleDetail {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: larger;
  margin: 10px auto;
  &>div {
    background-color: #fff;
    opacity: 90%;
  }

  .left {
    width: 99%;
    padding: 20px;
    margin-left: 2%;
    margin-right: 2%;
    &>div {
      margin-top: 10px;
      font-size: large;
      color: #555;
    }

    .title {
      display: flex;
      align-items: center;
      font-size: 24px;
      color: #333;
    }


    .time {
      margin-top: 10px;
    }

    .content {
      margin-top: 20px;
      line-height: 1.8;
      white-space: pre-wrap;
      word-break: break-word;
      text-align: justify;
    }

    .info {
      margin-top: 20px;
      font-size: 12px;
      color: #888;

      span {
        margin-right: 10px;

        &:last-child {
          margin-right: 0;
        }
      }
    }

    .el-divider {
      margin-top: 20px;
      margin-bottom: 20px;
    }

    .comments {
      margin-bottom: 20px;
    }

    .comment {
      margin-bottom: 10px;
      font-size: 14px;
      color: #555;
    }

    .username {
      font-weight: bold;
      margin-right: 5px;
    }

    .comment-form {
      margin-bottom: 20px;
    }


    .likeButton {

      padding: 6px 10px;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      color: #fff;
      background-color: #409EFF;
      cursor: pointer;
    }
    .editButton,
    .deleteButton{
      margin-left: 30px;
      padding: 6px 10px;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      color: #fff;
      background-color: #409EFF;
      cursor: pointer;
    }
  }

  .right {
    width: 29%;
    margin-left: 10px;
    background-color: #fff;
    padding: 20px;
    border: 1px burlywood;
    border-radius: 10px;
  }
}
</style>
