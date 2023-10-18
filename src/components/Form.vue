<template>
  <slot></slot>
</template>

<script setup>
import { provide } from 'vue';
const props = defineProps({
  wrapperCol: Object,
  labelCol: Object,
})
provide('wrapperCol', props.wrapperCol);
provide('labelCol', props.labelCol);
</script>