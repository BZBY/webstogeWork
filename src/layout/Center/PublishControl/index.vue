<template>
  <div class="bg">
    <h1><span style="font-size:25px">文章管理</span></h1>
    <table>
      <thead>
      <tr>
        <th>标题</th>
        <th>作者</th>
        <th>摘要</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="article in sortedArticles" :key="article.id">
        <td>{{ article.title }}</td>
        <td>{{ article.author }}</td>
        <td>{{ article.desc }}</td>
        <td>
          <button class="btn-delete" @click="showDeleteArticleConfirmation(article)">

            <svg class="icon" viewBox="0 0 1024 1024" width="24" height="24">
              <path d="M909.050991 169.476903l-217.554898 0 0-31.346939c0-39.5866-32.205493-71.792093-71.793116-71.792093L408.15591 66.337871c-39.5866 0-71.792093 32.205493-71.792093 71.792093l0 31.346939L113.349581 169.476903c-11.013845 0-19.942191 8.940626-19.942191 19.954471s8.928347 19.954471 19.942191 19.954471l84.264149 0 0 640.687918c0 60.479443 49.203632 109.683075 109.683075 109.683075l416.474366 0c60.479443 0 109.683075-49.203632 109.683075-109.683075L833.454246 209.385844l75.595722 0c11.012821 0 19.942191-8.940626 19.942191-19.954471S920.063813 169.476903 909.050991 169.476903zM376.2482 138.130987c0-17.593703 14.314007-31.907711 31.907711-31.907711l211.547067 0c17.593703 0 31.907711 14.314007 31.907711 31.907711l0 31.346939L376.2482 169.477926 376.2482 138.130987zM793.569864 850.074785c0 38.486546-31.312146 69.798692-69.798692 69.798692L307.297828 919.873478c-38.486546 0-69.798692-31.312146-69.798692-69.798692L237.499136 211.042577l556.070728 0L793.569864 850.074785z" fill="#272636"></path>
              <path d="M510.662539 861.276918c11.012821 0 19.954471-8.92937 19.954471-19.942191L530.61701 294.912753c0-11.013845-8.94165-19.942191-19.954471-19.942191s-19.954471 8.928347-19.954471 19.942191L490.708068 841.334727C490.708068 852.347548 499.649717 861.276918 510.662539 861.276918z" fill="#272636"></path>
              <path d="M374.562814 801.449321c11.012821 0 19.954471-8.92937 19.954471-19.942191L394.517285 354.74035c0-11.013845-8.94165-19.942191-19.954471-19.942191s-19.954471 8.928347-19.954471 19.942191l0 426.76678C354.608344 792.519951 363.549993 801.449321 374.562814 801.449321z" fill="#272636"></path>
              <path d="M649.832182 801.449321c11.012821 0 19.954471-8.92937 19.954471-19.942191L669.786653 354.74035c0-11.013845-8.94165-19.942191-19.954471-19.942191s-19.954471 8.928347-19.954471 19.942191l0 426.76678C629.877711 792.519951 638.81936 801.449321 649.832182 801.449321z" fill="#272636"></path>
            </svg>


          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: [],
    };
  },
  created() {
    // 从 localStorage 中获取文章数据
    this.articles = JSON.parse(localStorage.getItem('articles')) || [];
  },
  computed: {
    sortedArticles() {
      // 按发布时间排序的文章列表
      return this.articles.sort((a, b) => new Date(b.createTime) - new Date(a.createTime));
    },
  },
  methods: {
    showDeleteArticleConfirmation(article) {
      const confirmationMessage = `确定要删除文章 "${article.title}" 吗？`;
      if (confirm(confirmationMessage)) {
        this.deleteArticle(article);
        alert(`文章 "${article.title}" 已成功删除。`);
      }
    },
    deleteArticle(article) {
      // 删除文章
      const index = this.articles.findIndex(a => a.id === article.id);
      if (index !== -1) {
        this.articles.splice(index, 1);
        localStorage.setItem('articles', JSON.stringify(this.articles));
      }
    },
  },
};
</script>

<style scoped>
.bg{
  background-color: #fff;
}
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

button.btn-delete {
  background-color: #ccc;
}
</style>
