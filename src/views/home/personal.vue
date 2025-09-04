<template>
  <div>
    内容正在更新中，敬请期待。
    <Switch />
    <Button @click="check = !check">切换</Button>
  </div>
</template>

<script setup>
import {ref} from 'vue';

import Button from "@/components/uc/Button.vue";
import Switch from "@/components/uc/Switch.vue";

const check = ref(true)

function handleChange(value, event) {
  console.log('change', value, event)
}
function handleClick(value, event) {
  console.log('click', value, event)
}
</script>

<style scoped>

</style>