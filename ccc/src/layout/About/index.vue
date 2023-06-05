<template>
  <div class="about">
    <div class="main">
      <h1>聊天室</h1>
      <div class="chat-container">
        <div class="chat-messages">
          <div v-for="message in messages" :key="message.id" class="message">
            <div class="comment">
              <p>{{ message.sender }}: {{ message.content }}</p>
              <button @click="selectMessage(message.id)">回复</button>
            </div>
            <div v-if="message.replies.length > 0" class="replies">
              <div v-for="reply in message.replies" :key="reply.id" class="reply">
                <p>{{ reply.sender }}回复: {{ reply.content }}</p>
              </div>
            </div>
          </div>
        </div>
        <form @submit.prevent="sendMessage">
          <input type="text" v-model="newMessage" placeholder="请输入消息" required>
          <button type="submit">发送</button>
        </form>
        <form v-if="selectedMessageId" @submit.prevent="sendReply">
          <input type="text" v-model="newReply" placeholder="回复消息" required>
          <button type="submit">回复</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";

export default {
  data() {
    return {
      newMessage: "",
      newReply: "",
      messages: [],
      selectedMessageId: null,
    };
  },
  mounted() {
    const storedMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    this.messages = storedMessages;
  },
  methods: {
    sendMessage() {
      if (this.newMessage) {
        // 从 Web Storage 中读取用户信息
        const userFromStorage = localStorage.getItem("NowUser");
        const User = reactive({
          isLogin: !!userFromStorage,
          userinfo: userFromStorage ? JSON.parse(userFromStorage) : null,
        });

        const message = {
          id: new Date().getTime(),
          sender: User.userinfo ? User.userinfo.username : "匿名用户",
          content: this.newMessage,
          replies: [],
        };

        this.messages.push(message);

        localStorage.setItem("chatMessages", JSON.stringify(this.messages));

        this.newMessage = "";
      }
    },
    sendReply() {
      if (this.newReply && this.selectedMessageId) {
        // 从 Web Storage 中读取用户信息
        const userFromStorage = localStorage.getItem("NowUser");
        const User = reactive({
          isLogin: !!userFromStorage,
          userinfo: userFromStorage ? JSON.parse(userFromStorage) : null,
        });

        const reply = {
          id: new Date().getTime(),
          sender: User.userinfo ? User.userinfo.username : "匿名用户",
          content: this.newReply,
        };

        const selectedMessage = this.messages.find((message) => message.id === this.selectedMessageId);
        if (selectedMessage) {
          selectedMessage.replies.push(reply);
        }

        localStorage.setItem("chatMessages", JSON.stringify(this.messages));

        this.newReply = "";
        this.selectedMessageId = null;
      }
    },
    selectMessage(messageId) {
      this.selectedMessageId = messageId;
    },
  },
};
</script>

<style scoped>
.about {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}

.main {
  width: 70%;
  max-height: calc(100vh - 20px);
  overflow-y: auto;
  padding: 20px;
  background-color: #ffffff;
  opacity: 0.8;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.chat-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.chat-messages {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.comment {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background-color: #f5f5f5;

  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.reply {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.replies {
  margin-left: 20px;
}

.message p {
  margin: 0;
}

form {
  display: flex;
  gap: 10px;
}

input[type="text"] {
  flex-grow: 1;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 5px 10px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
