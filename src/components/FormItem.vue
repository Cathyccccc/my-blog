<template>
  <div class="form-item-container" :class="[`grid${labelCol.span}-${wrapperCol.span}`]">
    <label :for="$attrs.name">{{ $attrs.label }}</label>
    <div class="form-input"><slot></slot></div>
  </div>
</template>

<script setup>
import { inject } from 'vue';
const wrapperCol = inject('wrapperCol');
const labelCol = inject('labelCol');
const props = defineProps({
  wrapperCol: Object,
  labelCol: Object,
})


</script>

<style scoped>
.form-item-container {
  margin-bottom: 10px;
  display: grid;
}
label {
  line-height: 32px;
  font-size: 14px;
}
.grid2-22 {
  grid-template-columns: 1fr 11fr;
}
.grid3-21 {
  grid-template-columns: 1fr 7fr;
}
.grid4-20 {
  grid-template-columns: 1fr 5fr;
}
</style>