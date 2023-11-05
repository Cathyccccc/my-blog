<template>
  <div class="form-item-container" :style="{gridTemplateColumns: `${labelCol.span}fr ${wrapperCol.span}fr`}">
    <label :for="$attrs.name">{{ $attrs.label }}</label>
    <div class="form-input"><slot></slot></div>
  </div>
</template>

<script setup>
import { inject } from 'vue';
const wrapperCol = inject('wrapperCol');
const labelCol = inject('labelCol');


</script>

<style scoped>
.form-item-container {
  margin-bottom: 10px;
  display: grid;
  column-gap: 10px;
}
label {
  line-height: 32px;
  font-size: 14px;
  text-align: right;
  min-width: min-content;
}

</style>