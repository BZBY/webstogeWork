<template>
  <div class="note">
    <div class="content">
      <!-- 笔记内容 -->
    </div>

    <div class="side">
      <div class="sort">Newest ～ ｂｌｏｇ</div>
      <ul class="list">
        <li v-for="item in topList.list" :key="item.id" @click="toDetail(item.id)">
          <div class="item-row">
            <div class="title">{{ item.title }}</div>
          </div>
          <div class="item-row">
            <div class="desc">{{ item.desc }}</div>
          </div>
          <div class="item-row">
            <div class="author">作者：{{ item.author }}</div>
            <div class="likes">点赞数：{{ item.likecount }}</div>
          </div>
          <div class="item-row">
            <div class="date">{{ moment(item.createTime).format('YYYY-MM-DD') }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import moment from 'moment'
import { useRouter } from 'vue-router'
import SideNew from '../../components/SideNew.vue'

const router = useRouter()

const topList = reactive({
  list: []
})

// 文章详情页
const toDetail = (id) => {
  router.push({ path: '/articleDetial', query: { id: id } })
}

onMounted(() => {
  const articles = JSON.parse(localStorage.getItem('articles')) || []

  topList.list = articles.sort((a, b) => {
    const dateA = new Date(a.createTime)
    const dateB = new Date(b.createTime)
    return dateB - dateA
  })
})
</script>

<style scoped lang="less">
.note {
  display: flex;
  flex-direction: column;

  .content {
    /* 笔记内容样式 */
  }

  .side {
    width: 100%;

    .sort {
      color: #555;
      font-weight: bold;
      padding: 5px 0;
      border-bottom: 2px solid #f2f2f2;
    }

    .list {
      background-color: #f9f9f9;
      padding: 10px;
      cursor: pointer;

      li {
        padding: 20px 0;
        color: #333;
        border-bottom: 1px solid #e6e6e6;

        .item-row {
          margin-bottom: 10px;
        }

        .desc {
          font-size: 14px;
          color: #666;
        }

        .title {
          font-size: 18px;
          font-weight: bold;
        }

        .author,
        .likes,
        .date {
          font-size: 14px;
          color: #666;
        }
      }
    }
  }
}
</style>
