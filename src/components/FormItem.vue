<template>
  <div class="form-item-container">
    <label :for="$attrs.name">{{ $attrs.label }}</label>
    <slot></slot>
  </div>
</template>

<script setup></script>

<style scoped>
.form-item-container {
  margin-bottom: 10px;
}
label {
  margin-right: 10px;
}
</style>