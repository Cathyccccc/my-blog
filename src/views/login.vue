<template>
  <div class="w-full h-full px-4 lg:p-0 box-border bg-linear-to-b from-violet-400 via-sky-200 via-40% to-transparent to-50%">
    <LoginText />
    <img class="relative z-10 md:w-1/2 lg:w-1/3 mx-auto translate-y-4" src="../../public/img/login.png" alt="" />
    <div
      class="relative md:w-1/2 xl:w-1/3 left-1/2 -translate-x-1/2 bg-app sm:bg-[--app-bg-color] px-4 sm:px-12 py-15 rounded-lg"
    >
      <Form :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
        <FormItem label="Account" class="bg-[#ffffff] sm:bg-inherit px-2 sm:px-0 rounded-md">
          <Input v-model:value.trim="loginObj.loginId" class="border-none" autofocus />
        </FormItem>
        <FormItem label="Password" class="bg-[#ffffff] sm:bg-inherit px-2 sm:px-0 rounded-md">
          <Input v-model:value.trim="loginObj.loginPwd" class="border-none" type="password" />
        </FormItem>
        <Button class="mt-8" block type="primary" @click.prevent="handleLogin">Sign in</Button>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

import api from "@/api";
import LoginText from '@/components/bc/LoginText.vue';
import Button from "@/components/uc/Button.vue";
import Form from "@/components/uc/Form.vue";
import FormItem from "@/components/uc/FormItem.vue";
import Input from "@/components/uc/Input.vue";
// import Message from "../components/Message.vue";

const loginObj = reactive({
  loginId: null,
  loginPwd: null,
});
// const isShow = ref(false);
// const messageType = ref("success");
// const messageTxt = ref(null);
const router = useRouter();
const handleLogin = () => {
  if (!loginObj.loginId || !loginObj.loginPwd) return;
  api.login.logIn(loginObj).then((res) => {
    sessionStorage.setItem("token", res.token);
    sessionStorage.setItem("userInfo", JSON.stringify(loginObj));
    loginObj.loginId = null;
    loginObj.loginPwd = null;
    router.push("/");
  });
};
</script>

<style scoped>

</style>
