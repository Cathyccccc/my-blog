<template>
  <div class="group w-10 h-10 flex justify-center items-center" @click="handleClick">
    <svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <rect
        width="96"
        height="4"
        fill="#6610f2"
        x="2"
        y="30"
        :class="['transition-transform', 'custom-origin-1', { 'active-1': value }]"
      >
      </rect>
      <rect
        width="96"
        height="4"
        fill="#6610f2"
        x="2"
        y="50"
        :class="['transition-width', { 'active-width': value }]"
      />
      <rect
        width="96"
        height="4"
        fill="#6610f2"
        x="2"
        y="70"
        :class="['transition-transform', 'custom-origin-2', { 'active-2': value} ]"
      />
    </svg>
  </div>
</template>

<script setup>
const props = defineProps({
  value: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle']);

function handleClick() {
  emit('toggle', !props.value);
}
</script>

<style scoped>
.active-1 {
  width: 110px;
  transform: rotate(45deg);
}
.active-2 {
  width: 110px;
  transform: rotate(-45deg);
}
.active-width {
  width: 0;
}
</style>
