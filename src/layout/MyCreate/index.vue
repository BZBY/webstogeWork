<template>
  <!-- 发布文章 -->
  <div class="myCreate">
    <div class="articleArea">
      <div class="title">
        <el-form-item label="标题">
          <el-input
              v-model="article.title"
              placeholder="请输入文章标题（3-20）字"
          ></el-input>


        </el-form-item>
        <el-form-item label="文章标签" >
          <el-input  style="width: 100%" v-model="article.tag" placeholder="请输入标签"></el-input>
        </el-form-item>
      </div>

      <div class="author">


      </div>

      <div class="content">
        <el-form-item label="正文">
          <el-input
              :autosize="{ minRows: 10, maxRows: 20 }"
              type="textarea"
              v-model="article.content"
          ></el-input>
        </el-form-item>
      </div>

      <div class="btn">
        <el-button type="primary" @click="publish">发布</el-button>
        <el-button @click="save">保存</el-button>
      </div>
      <!-- <Publish></Publish> -->

    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();

// 从 Web Storage 中读取用户信息
const userFromStorage = localStorage.getItem("NowUser");
const User = reactive({
  isLogin: !!userFromStorage,
  userinfo: userFromStorage ? JSON.parse(userFromStorage) : null,
});

const article = reactive({
  id: 0,
  title: "",
  author: "",
  tag: "",
  content: "",
  readcount: 0,
  likecount: 0,
  comments: [],
  createTime: "",
  desc: ""
});

import { onMounted } from "vue";

onMounted(() => {
  const editFlag = localStorage.getItem("EditIs");
  if (editFlag === "1") {
    const tmpWords = localStorage.getItem("tmpWords");
    if (tmpWords) {
      const data = JSON.parse(tmpWords);
      if (data.author === JSON.parse(localStorage.getItem("NowUser")).username) {
        article.title = data.title;
        article.tag = data.tag;
        article.content = data.content;
        article.desc = "desc : " + data.content.slice(0, 15) + (data.content.length > 15 ? "..." : "");
        article.author = data.author;
      }
    }
  }
});

const publish = () => {
  if (!User.isLogin) {
    ElMessage.error("未登录，请登录后再发布");
    router.push({ path: "/login" });
  } else {
    if (
        article.title === "" ||
        article.tag === "" ||
        article.content === ""
    ) {
      ElMessage.error("请正确填写标题、标签、正文");
    } else {
      // 获取现有文章数据
      let articles = JSON.parse(localStorage.getItem('articles')) || [];

      // 获取最大id值
      const maxId = articles.reduce((max, article) => Math.max(max, article.id), 0);

      // 构造新的文章对象
      const newArticle = {
        id: maxId + 1,
        title: article.title,
        author: User.userinfo.username,
        tag: article.tag,
        content: article.content,
        readcount: 0,
        likecount: 0,
        comments: [],
        createTime: new Date().toString(),
        desc: "desc : " + article.content.slice(0, 15) + (article.content.length > 15 ? "..." : "") // 添加此行
      };

      // 将新文章添加到文章数组中
      articles.push(newArticle);

      // 更新文章数据
      localStorage.setItem('articles', JSON.stringify(articles));
      localStorage.removeItem("tmpWords");
      localStorage.setItem("EditIs", "0");

      ElMessage.success("发布成功");
      // 获取当前页面的根路径
      const rootPath = window.location.origin

      // 跳转到根路径
      window.location.href = rootPath
    }
  }
};

const save = () => {
  if (!User.isLogin) {
    ElMessage.error("未登录，请登录后再保存");
    router.push({ path: "/login" });
  } else {
    if (
        article.title === "" ||
        article.tag === "" ||
        article.content === ""
    ) {
      ElMessage.error("请正确填写标题、标签、正文");
    } else {
      // 获取现有文章数据
      let articles = JSON.parse(localStorage.getItem('articles')) || [];

      // 构造新的文章对象
      const newArticle = {
        id: article.id,
        title: article.title,
        author: User.userinfo.username,
        tag: article.tag,
        content: article.content,
        readcount: article.readcount,
        likecount: article.likecount,
        comments: article.comments,
        createTime: article.createTime,
        desc:"desc : " + article.content.slice(0, 15) + (article.content.length > 15 ? "..." : "")// 添加此行
      };

      localStorage.setItem("tmpWords", JSON.stringify(newArticle));
      localStorage.setItem("EditIs", "1");

      // 查找并替换现有文章数据中的对应文章
      const index = articles.findIndex(a => a.id === article.id);
      if (index !== -1) {
        articles.splice(index, 1, newArticle);
      }

      // 更新文章数据
      localStorage.setItem('articles', JSON.stringify(articles));

      ElMessage.success("保存成功");
      // 获取当前页面的根路径
      const rootPath = window.location.origin

      // 跳转到根路径
      window.location.href = rootPath
    }
  }
};
</script>

<style scoped lang='less'>
.myCreate {
  margin-top: 10px;
  padding: 20px;
  font-size: larger;
  opacity: 90%;
  color: #100f0f;
  font-weight: bolder;

  .articleArea {
    font-weight: bold;
    padding: 20px;
    width: 100%;
    border: 1px solid #0e7bef;
    background-color: #fff;
    border-radius: 13px;

    & > div {
      margin-bottom: 10px;
    }

    .title {
      width: 100%;
    }

    .author {
      width: 100%;
      margin-top: 20px;
      display: flex;

      & > div {
        width: 30%;
        margin-right: 20px;
      }
    }

    .btn {
      width: 100%;
      text-align: end;
    }
  }
}
</style>
