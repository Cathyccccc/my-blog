<template>
  <div class="form-item-container">
    <label :for="$attrs.name">{{ $attrs.label }}</label>
    <div class="form-input"><slot></slot></div>
  </div>
</template>

<script setup></script>

<style scoped>
.form-item-container {
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-start;
}
label {
  line-height: 32px;
  flex: 1 1 15%;
  margin-right: 10px;
}
.form-input {
  flex: 1 1 85%;
}
</style>