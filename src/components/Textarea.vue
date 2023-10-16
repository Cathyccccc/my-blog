<template>
  <textarea :value="value" v-bind="$attrs" @change="$emit('update:value', $event.target.value)" />
</template>

<script setup>
const props = defineProps({
  value: {
    type: String,
    default: '',
  },
})
defineEmits(['update:value'])
</script>

<style scoped>
textarea {
  width: 100%;
  box-sizing: border-box;
  border: none;
  outline: none;
  border-radius: 10px;
  padding: 10px;
  resize: none;
  border: 1px solid #eee;
}

textarea::placeholder {
  color: #55BBFF;
  font-weight: 600;
}

textarea:-moz-placeholder {
  color: #55BBFF;
  font-weight: 600;
}

textarea:-ms-input-placeholder {
  color: #55BBFF;
  font-weight: 600;
}

.comment-length {
  position: absolute;
  right: 15px;
  bottom: 45px;
  color: #ccc;
  font-size: 14px;
}
</style>