<template>
  <button
    type="button"
    role="switch"
    aria-checked="true"
    :class="[switchClass]"
    :disabled="disabled"
    @click.stop="handleClick"
  >
    <div :class="[circleClass, ]"></div>
    <!-- <span class="ant-switch-inner">
      <span class="ant-switch-inner-checked"></span>
      <span class="ant-switch-inner-unchecked"></span>
    </span> -->
  </button>
</template>

<script setup>
import { computed,ref, watchEffect } from 'vue';

const props = defineProps({
  defaultChecked: { // 初始默认值
    type: Boolean,
  },
  checked: { // 是否开启
    type: Boolean,
    default: false,
  },
  size: { // 开关大小
    type: String,
    default: "default",
    validator(value) {
      return ["small", "default"].includes(value)
    }
  },
  disabled: { // 是否禁用
    type: Boolean,
    default: false,
  }
})

const emit = defineEmits(['change', 'click'])

// 非受控：组件自身控制值
const checkSelf = ref(props.defaultChecked || props.checked);

const switchClass = computed(() => {
  let baseClass = 'relative inline-block rounded-full align-middle cursor-pointer transition duration-200 delay-100'
  const sizes = {
    small: 'w-7 h-4',
    default: 'w-12 h-6'
  }
  let switchBg = checkSelf.value ? 'bg-indigo-500' : 'bg-zinc-200';
  if (props.disabled) {
    baseClass += ' cursor-not-allowed'
    switchBg = checkSelf.value ? 'bg-indigo-500/80' : 'bg-zinc-200/80'
  }
  return `${baseClass} ${sizes[props.size]} ${switchBg}`
})

const circleClass = computed(() => {
  const baseClass = 'bg-white rounded-full transition duration-300';
  const sizes = {
    small: 'w-3 h-3',
    default: 'w-5 h-5',
  }
  const animate = {
    small: checkSelf.value ? ' translate-x-3.5': 'translate-x-0.5',
    default: checkSelf.value ? 'translate-x-6.5' : 'translate-x-0.5',
  }
  return `${baseClass} ${sizes[props.size]} ${animate[props.size]}`
})

// 受控：根据外部值的变化而变化
watchEffect(() => {
  checkSelf.value = props.checked;
})

function handleClick(event) {
  checkSelf.value = !checkSelf.value
  if (!props.disabled) {
    const event = new CustomEvent('change', {
      detail: {
        value: checkSelf.value
      }
    })
    emit('change', checkSelf.value, event);
  }
  emit('click', checkSelf.value, event);
}
</script>

<style scoped></style>
