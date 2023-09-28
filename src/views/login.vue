<template>
  <div class="login-container">
    <!-- <div class="login-form"> -->
    <form @submit="handleLogin">
      <p>
        <label for="loginId">Account</label>
        <input type="text" id="loginId" v-model="loginId">
      </p>
      <p>
        <label for="loginPwd">Password</label>
        <input type="password" id="loginPwd" v-model="loginPwd">
      </p>
      <p>
        <button>Login</button>
      </p>
    </form>
    <Message v-if="isShow" :txt="messageTxt" :type="messageType" />
    <!-- </div> -->
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { logOn } from '/src/api/login';
import Message from '../components/Message.vue';

const loginId = ref(null);
const loginPwd = ref(null);
const isShow = ref(false);
const messageType = ref('success');
const messageTxt = ref('登录成功');
const router = useRouter();
const handleLogin = () => {
  if (loginId.value && loginPwd.value) {
    logOn({ loginId, loginPwd }).then((res) => {
      console.log(res)
      isShow.value = true;
      if (res.success) {
        messageType.value = 'success';
        messageTxt.value = '登录成功';
        setTimeout(() => {
          isShow.value = false;
          localStorage.setItem('userInfo', JSON.stringify({ loginId: loginId.value }))
          router.push({ path: '/article', params: {userInfo: {loginId: loginId.value}} });
        }, 1000)
      } else {
        messageType.value = 'error';
        messageTxt.value = '登录失败';
        setTimeout(() => {
          isShow.value = false;
        }, 1000)
      }
    })
  }
}
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
  padding-top: 100px;
  box-sizing: border-box;
  text-align: center;
  background: #FFF;
}

p {
  margin-bottom: 10px;
}

label {
  display: inline-block;
  font-size: 20px;
  width: 100px;
  text-align: left;
}

input {
  height: 36px;
  width: 300px;
  outline: none;
  border: 2px solid #acdeff;
  border-radius: 5px;
  padding: 2px 8px;
  box-sizing: border-box;
  font-size: 18px;
}

button {
  width: 400px;
  padding: 0.4em;
  font-size: 22px;
}
</style>