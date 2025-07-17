<template>
    <div class="absolute w-[400px] left-1/2 top-[150px] -translate-x-1/2">
      <Form :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
        <FormItem label="Account">
          <Input v-model:value.trim="loginObj.loginId" />
        </FormItem>
        <FormItem label="Password">
          <Input v-model:value.trim="loginObj.loginPwd" type="password" />
        </FormItem>
        <FormItem>
          <Button type="primary" @click.prevent="handleLogin">Sign in</Button>
        </FormItem>
      </Form>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { logIn } from "/src/api/login";
import Form from "../components/uc/Form.vue";
import FormItem from "../components/uc/FormItem.vue";
import Input from "../components/uc/Input.vue";
import Button from "../components/uc/Button.vue";
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
  logIn(loginObj).then((res) => {
    sessionStorage.setItem("token", res.token);
    sessionStorage.setItem("userInfo", JSON.stringify(loginObj));
    loginObj.loginId = null;
    loginObj.loginPwd = null;
    router.push("/");
  });
};
</script>

<style scoped>
.login-box {
  width: 400px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 100px;
}
</style>
