<template>
  <textarea :value="value" v-bind="$attrs" @change="handleChange" />
</template>

<script setup>
const props = defineProps({
  value: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['update:value', 'change'])
function handleChange(e) {
  emit('update:value', e.target.value)
  emit('change', e.target.value)
}
</script>

<style scoped>
textarea {
  width: 100%;
  box-sizing: border-box;
  outline: none;
  border-radius: 5px;
  padding: 5px;
  resize: none;
  border: 1px solid #eee;
  font: inherit;
  font-size: 14px;
  color: #3c3c3c;
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

textarea:focus {
  border-color: #55BBFF;
}

.comment-length {
  position: absolute;
  right: 15px;
  bottom: 45px;
  color: #ccc;
  font-size: 14px;
}
</style>