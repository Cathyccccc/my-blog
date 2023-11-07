<template>
  <div class="login-container">
    <div class="login-box">
      <Form :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
        <FormItem label="Account">
          <Input v-model:value.trim="loginObj.loginId" />
        </FormItem>
        <FormItem label="Password">
          <Input v-model:value.trim="loginObj.loginPwd" type="password" />
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleLogin">Sign in</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { logOn } from '/src/api/login';
import Form from '../components/Form.vue';
import FormItem from '../components/FormItem.vue';
import Input from '../components/Input.vue';
import Button from '../components/Button.vue';
import Message from '../components/Message.vue';

const loginObj = reactive({
  loginId: null,
  loginPwd: null,
})
const isShow = ref(false);
const messageType = ref('success');
const messageTxt = ref(null);
const router = useRouter();
const handleLogin = () => {
  if (!loginObj.loginId || !loginObj.loginPwd) return;
  logOn(loginObj).then((res) => {
    if (res.success === false) {
      console.log(res.data.msg);
    } else {
      sessionStorage.setItem('userInfo', JSON.stringify(loginObj));
      router.push({ name: 'article'});
    }
    loginObj.loginId = null;
    loginObj.loginPwd = null;
  })
}
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
  padding-top: 100px;
  box-sizing: border-box;
  background: #FFF;
}

.login-box {
  width: 400px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>