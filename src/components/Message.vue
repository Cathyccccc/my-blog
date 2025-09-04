<template>
  <div class="message-container" :style="{background: bgColor}">
    {{ txt }}
  </div>
</template>

<script>
export default {
  name: 'Message'
}
</script>

<script setup>
import { onMounted,ref } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: 'info',
  },
  txt: String,
})
const {type} = props;
const bgColor = ref('#55BBFF');
onMounted(() => {
  switch(type) {
    case 'success':
      bgColor.value = '#aed581';
      break;
    case 'warning':
      bgColor.value = '#ffdd00';
      break;
    case 'error':
      bgColor.value = '#ef5350';
      break;
    default:
      bgColor.value = '#55BBFF';
  }
})
</script>

<style scoped>
.message-container {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 50px;
  border-radius: 5px;
  height: 26px;
  line-height:26px;
  font-size: 14px;
  color: #fff;
  padding: 0 20px;
  -webkit-animation: show_message .5s ease-in forwards;
  animation: show_message .5s ease-in forwards;
}
@-webkit-keyframes show_message {
  from {
    top: 50px;
    opacity: 0;
  }
  to {
    top: 100px;
    opacity: 1;
  }
}
@keyframes show_message {
  from {
    top: 50px;
    opacity: 0;
  }
  to {
    top: 100px;
    opacity: 1;
  }
}
</style>