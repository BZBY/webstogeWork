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

            <svg class="icon" viewBox="0 0 1024 1024" width="24" height="24">
              <path d="M934.65 408.81H918l-21.63-84.07a16.7 16.7 0 0 0-16.17-12.53H600.65a16.7 16.7 0 0 0-16.17 12.53l-21.63 84.07h-16.64a16.7 16.7 0 0 0-16.69 16.7V494a16.7 16.7 0 0 0 16.69 16.69h13.73l17 331.16h-4.54a16.7 16.7 0 0 0-16.7 16.7v45.67a16.7 16.7 0 0 0 16.7 16.7h336.07a16.7 16.7 0 0 0 16.7-16.7v-45.71a16.7 16.7 0 0 0-16.7-16.7h-4.53l17-331.16h13.73A16.69 16.69 0 0 0 951.34 494v-68.49a16.7 16.7 0 0 0-16.69-16.7z m-371.74 68.45V442.2H918v35.06H563zM613.6 345.6h253.66l16.27 63.21H597.34z m278.18 541.89H589.1V875.2h302.68z m-21.28-45.68H610.37l-17-331.16h294.1z" fill="#3A3F44"></path>
              <path d="M654.49 815.62a8.34 8.34 0 0 0 8.35-8.34V553.09a8.35 8.35 0 1 0-16.7 0v254.19a8.34 8.34 0 0 0 8.35 8.34zM697.46 815.62a8.34 8.34 0 0 0 8.35-8.34V553.09a8.35 8.35 0 1 0-16.7 0v254.19a8.34 8.34 0 0 0 8.35 8.34zM740.43 815.62a8.34 8.34 0 0 0 8.35-8.34V553.09a8.35 8.35 0 0 0-16.7 0v254.19a8.34 8.34 0 0 0 8.35 8.34zM783.4 815.62a8.34 8.34 0 0 0 8.35-8.34V553.09a8.35 8.35 0 0 0-16.7 0v254.19a8.34 8.34 0 0 0 8.35 8.34zM826.37 815.62a8.34 8.34 0 0 0 8.35-8.34V553.09a8.35 8.35 0 0 0-16.7 0v254.19a8.34 8.34 0 0 0 8.35 8.34zM525.51 740.41H240.16v-17.68h282.73a16.7 16.7 0 0 0 0-33.39H349v-37.67h170.7a16.7 16.7 0 1 0 0-33.39H106.05v-40.65h409.83a8.35 8.35 0 0 0 0-16.69H106.05v-370.6h642.72v71.16a16.7 16.7 0 0 0 33.39 0V119.82a16.7 16.7 0 0 0-16.7-16.7H89.35a16.7 16.7 0 0 0-16.69 16.7V635a16.7 16.7 0 0 0 16.69 16.7h243v37.67H223.47a16.7 16.7 0 0 0-16.7 16.63v51.08a16.7 16.7 0 0 0 16.7 16.7h302a16.7 16.7 0 0 0 0-33.4z m223.26-603.9v37.13H106.05v-37.13z" fill="#3A3F44"></path>
              <path d="M179.89 249.14a8.35 8.35 0 0 0-8.35 8.35V494a8.35 8.35 0 0 0 8.35 8.34H234a8.35 8.35 0 0 0 8.35-8.34V257.49a8.35 8.35 0 0 0-8.35-8.35z m45.73 236.47h-37.38V265.83h37.38zM283.8 359.06a8.35 8.35 0 0 0-8.35 8.35V494a8.35 8.35 0 0 0 8.35 8.34h54.08a8.34 8.34 0 0 0 8.34-8.34V367.41a8.34 8.34 0 0 0-8.34-8.35z m45.73 126.55h-37.38V375.75h37.38zM387.69 290.78a8.35 8.35 0 0 0-8.34 8.35V494a8.35 8.35 0 0 0 8.34 8.34h54.09a8.35 8.35 0 0 0 8.35-8.34V299.13a8.35 8.35 0 0 0-8.35-8.35z m45.75 194.83H396V307.48h37.4z" fill="#3A3F44"></path>
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
