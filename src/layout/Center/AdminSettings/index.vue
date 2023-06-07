<template>
  <div class="bg">
    <h1><span style="font-size:25px">用户管理</span></h1>
    <table>
      <thead>
      <tr>
        <th>昵称</th>
        <th>文章数量</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in filteredUsers" :key="user.username">
        <td>{{ user.nickname }}</td>
        <td>{{ getUserArticleCount(user) }}</td>
        <td>
          <button class="btn-delete" @click="showDeleteUserConfirmation(user)">删除用户</button>
          <button class="btn-delete" @click="showDeleteUserArticlesConfirmation(user)">删除用户文章</button>
          <button class="btn-set-admin" @click="showSetAdminConfirmation(user)">设置管理员</button>
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
      users: [],
      articles: [],
    };
  },
  created() {
    // 从 localStorage 中获取数据
    this.users = JSON.parse(localStorage.getItem('UsersALL')) || [];
    this.articles = JSON.parse(localStorage.getItem('articles')) || [];
  },
  computed: {
    filteredUsers() {
      // 过滤掉当前用户
      const currentUser = JSON.parse(localStorage.getItem('NowUser'));
      return this.users.filter(user => user.username !== currentUser.username);
    },
  },
  methods: {
    getUserArticleCount(user) {
      // 计算用户发表的文章数量
      return this.articles.filter(article => article.author === user.nickname).length;
    },
    showDeleteUserConfirmation(user) {
      const confirmationMessage = `确定要删除用户 "${user.nickname}" 吗？`;
      if (confirm(confirmationMessage)) {
        this.deleteUser(user);
        alert(`用户 "${user.nickname}" 已成功删除。`);
      }
    },
    showDeleteUserArticlesConfirmation(user) {
      const confirmationMessage = `确定要删除用户 "${user.nickname}" 的所有文章吗？`;
      if (confirm(confirmationMessage)) {
        this.deleteUserArticles(user);
        alert(`用户 "${user.nickname}" 的所有文章已成功删除。`);
      }
    },
    showSetAdminConfirmation(user) {
      const confirmationMessage = `确定要将用户 "${user.nickname}" 设置为管理员吗？`;
      if (confirm(confirmationMessage)) {
        this.setAdmin(user);
        alert(`用户 "${user.nickname}" 已成功设置为管理员。`);
      }
    },
    deleteUser(user) {
      // 删除用户
      const index = this.users.findIndex(u => u.username === user.username);
      if (index !== -1) {
        this.users.splice(index, 1);
        localStorage.setItem('UsersALL', JSON.stringify(this.users));
      }
    },
    deleteUserArticles(user) {
      // 删除用户的所有文章
      this.articles = this.articles.filter(article => article.author !== user.nickname);
      localStorage.setItem('articles', JSON.stringify(this.articles));
    },
    setAdmin(user) {
      // 设置用户为管理员
      user.isAdmin = 1;
      localStorage.setItem('UsersALL', JSON.stringify(this.users));
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
.bg {
  background-color: white;
}
th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

button.btn-delete,
button.btn-set-admin {
  margin-right: 10px;
  background-color: #ccc;
}

</style>
