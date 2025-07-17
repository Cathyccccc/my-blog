<template>
  <form :class="formClass" :style="{width}">
    <slot></slot>
  </form>
</template>

<script setup>
import { provide, computed } from 'vue';
const props = defineProps({
  wrapperCol: Object,
  labelCol: Object,
  layout: {
    type: String,
    default: "horizontal"
  },
  inline: {
    type: Boolean,
    default: false
  },
  width: String,
  labelAlign: {
    type: String,
    default: 'right'
  }
})
provide('wrapperCol', props.wrapperCol);
provide('labelCol', props.labelCol);
provide('layout', props.layout);
provide('labelAlign', props.labelAlign);

const formClass = computed(() => {
  let classStr = '';
  if(props.inline) {
    classStr += 'flex flex-wrap';
  }
  if (!props.width) {
    classStr += 'max-w-[500px]'
  }
  return classStr;
})

</script>