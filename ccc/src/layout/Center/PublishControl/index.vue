<template>
  <div class="home">
    <div class="left">
      <div class="sort">Ｂｅｓｔ　Ｂｌｏｇ</div>

      <ArticleCard v-for="item in hotList.list" :info="item"></ArticleCard>
    </div>
    <div class="right">
      <!-- 最新发布 -->
      <SideNew></SideNew>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import ArticleCard from '@/components/articleCard.vue'
import SideNew from '../../components/SideNew.vue'
import { hot } from '../../assets/data/articleData'

//热门博文列表
const hotList = reactive({
  list:[]
})

onMounted(() => {
  hotList.list = hot
})








</script>

<style lang="less" scoped>
.home{
  width: 90%;
  display: flex;
  margin: 10px auto;
  justify-content: space-between;
  opacity:90%;
  .left{
    width: 69%;
    background-color: #fff;
    padding: 20px;
    margin-right:10px;
    border: 1px burlywood;
    border-radius: 10px;
  }

  .right{
    width: 29%;
    margin-left:10px;
    background-color: #fff;
    padding: 20px;
    border: 1px burlywood;
    border-radius: 10px;
  }

  .sort{
    color:#555;
    font-weight: bold;
    padding:5px 0;
    border-bottom: 2px solid #f2f2f2;
  }
}
</style>