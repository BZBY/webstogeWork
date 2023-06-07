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
          <button class="btn-delete" @click="showDeleteUserConfirmation(user)">

            <svg class="icon" viewBox="0 0 1024 1024" width="24" height="24">
              <path d="M661.1 292.8c0-61.1-23.8-118.6-66.9-161.8C551 87.8 493.7 64 432.7 64s-118.4 23.8-161.5 67c-43.1 43.2-66.9 100.7-66.9 161.8 0 61.1 23.8 118.6 66.9 161.8 11.5 11.5 24 21.6 37.3 30.3-6.5 2.3-12.9 4.8-19.3 7.6-43.9 18.6-83.3 45.2-117.2 79.1-33.9 33.9-60.4 73.4-79 117.4-19.2 45.6-29 93.9-29 143.8 0 17.7 14.3 32 31.9 32s31.9-14.3 31.9-32c0-168.3 136.7-305.3 304.8-305.3 26.4 0 52.5 3.4 77.8 10 17.1 4.5 34.5-5.7 39-22.8 2.2-8.2 0.9-16.6-2.9-23.5 17.2-9.9 33.2-22.2 47.5-36.6 43.3-43.2 67.1-100.7 67.1-161.8zM432.7 457.5c-90.7 0-164.5-73.9-164.5-164.7S342 128.1 432.7 128.1 597.2 202 597.2 292.8s-73.8 164.7-164.5 164.7z" fill="#727272"></path>
              <path d="M795.2 728.8L960 532.1 766.6 694.5l-165-197-68.9 69.1 193.1 162.2L532.7 891l68.9 69 165-197L960 925.5z" fill="#CE6043"></path>
            </svg>

          </button>
          <button class="btn-delete" @click="showDeleteUserArticlesConfirmation(user)">

            <svg t="1686124004339" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2862" width="24" height="24">
              <path d="M17.47 6.93H15.8l-1.8-7.01a1.39 1.39 0 0 0-1.34-1.04H8.49a1.39 1.39 0 0 0-1.34 1.04l-1.8 7.01H3.69a1.39 1.39 0 0 0-1.39 1.39v4.95a1.39 1.39 0 0 0 1.39 1.39h1.15l1.13 22.19h-0.38a1.39 1.39 0 0 0-1.39 1.39v3.76a1.39 1.39 0 0 0 1.39 1.39h7.04a1.39 1.39 0 0 0 1.39-1.39v-3.77a1.39 1.39 0 0 0-1.39-1.39h-0.38l1.13-22.19h1.16A1.39 1.39 0 0 0 18.26 18v-5.61a1.39 1.39 0 0 0-1.39-1.46z m-9.71 5.59V7.14H15.8v1.4H7.15zM9.09 5.53h8.11l0.83 3.24H8.27z m8.63 14.02H8.73v-1.4h17.06z m-0.96-5.61H9.42l-1.13-22.19h21.49z" fill="#3A3F44" p-id="2863"></path>
              <path d="M3.97 5.79a1.39 1.39 0 0 0-1.39 1.39v4.95a1.39 1.39 0 0 0 1.39 1.39H8.08a1.39 1.39 0 0 0 1.39-1.39V7.18a1.39 1.39 0 0 0-1.39-1.39z m5.18 4.46h-4.51V7.36h4.51zM9.32 8.6a1.39 1.39 0 0 0-1.39 1.39v4.95a1.39 1.39 0 0 0 1.39 1.39h4.66a1.39 1.39 0 0 0 1.39-1.39V9.99a1.39 1.39 0 0 0-1.39-1.39z m5.18 4.46H10.1V10.25h4.4zM13.93 6.32a1.39 1.39 0 0 0-1.39 1.39v4.95a1.39 1.39 0 0 0 1.39 1.39h4.66a1.39 1.39 0 0 0 1.39-1.39V7.71a1.39 1.39 0 0 0-1.39-1.39z m5.21 4.46H15.7V8.49h4.44z" fill="#3A3F44" p-id="2865"></path>
            </svg>



          </button>
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
