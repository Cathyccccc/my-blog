<template>
  <!-- <div class="btn-container"> -->
    <button :class="[type, shape, size]" v-bind="$attrs">
      <slot></slot>
    </button>
  <!-- </div> -->
</template>

<script setup>
const props = defineProps({
  type: { // 按钮类型 ('default', 'primary', 'danger', 'link')
    type: String,
    default: 'default',
  },
  shape: { // 按钮形状 (default, 'round', 'circle')
    type: String,
  },
  size: { // 按钮大小 ('small', 'middle', 'large')
    type: String,
    default: 'middle',
  }
})
</script>

<style scoped>
button {
  cursor: pointer;
  outline: none;
  border: none;
  line-height: 1;
  font-size: 14px;
  border-radius: 5px;
  font-family: inherit;
  transition: all .3s;
}
button:hover {
  opacity: .8;
}
button:not(.circle) {
  padding: 4px 12px;
  height: 32px;
}
.default {
  color: #3c3c3c;
  background-color: #fff;
  border: 1px solid #eee;
  /* transition: all .3s; */
}
.default:hover {
  color: #72c7ff;
  border-color: #72c7ff;
}
.default:active {
  color: #55BBFF;
  border-color: #55BBFF;
  box-shadow: 0 0 5px 1px #55BBFF;
}
.primary {
  background-color: #55BBFF;
  color: #fff;
}
.primary:active {
  background-color: #72c7ff;
  box-shadow: 0 0 5px 1px #55BBFF;
}
.danger {
  color: #ff4d4f;
  background-color: #fff;
  border: 1px solid #ff4d4f;
}
.danger:active {
  box-shadow: 0 0 5px 1px #ff6c6e;
}
.link {
  background-color: transparent;
  border: none;
  color: #72c7ff;
  font-weight: 600;
  /* transition: all .3s; */
}
.link:active {
  color: #00BBFF;
}
/* 设置按钮形状 */
.circle {
  min-width: 24px;
  height: auto;
  padding: 1.1em 0.1em;
  border-radius: 50%;
}
.round {
  width: auto;
  padding-inline-start: 12px;
  padding-inline-end: 12px;
  border-radius: 2.5em;
}
/* 设置按钮大小 */
.small:not(.circle) {
  height: 26px;
  font-size: 13px;
}
.small.circle {
  font-size: 13px;
}
.large:not(.circle) {
  height: 40px;
  font-size: 16px;
}
.large.circle {
  font-size: 16px;
}
</style>