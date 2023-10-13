<template>
  <div class="modal-container">
    <div class="mask" :style="{ display: activeDisplay }"></div>
    <div class="modal" tabindex="-1">
      <div class="modal-content">
        <div class="title">{{ $attrs.title }}</div>
        <div class="content">
          <slot></slot>
        </div>
        <div class="footer">
          <Button @click="handleCancel">{{ cancelText }}</Button>
          <Button type="primary" @click="handleOk">{{ okText }}</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from './Button.vue';
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  okText: {
    type:String,
    default: 'Ok'
  },
  cancelText: {
    type: String,
    default: 'Cancel'
  },
})
const activeDisplay = props.open ? 'block' : 'none';
console.log(props)
const emits = defineEmits(['onCancel', 'onOk', 'update:open'])
function handleBlur() {
  console.log('失焦')
}
// 点击cancel按钮
function handleCancel() {
  emits('update:open', false)
  emits('onCancel')
}
// 点击ok按钮
function handleOk() {
  emits('onOk')
}
</script>

<style scoped>
.mask, .modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
}
.mask {
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45);
}
.modal {
  overflow: auto;
}
.modal-content {
  background-color: #fff;
  border-radius: 10px;
  width: 520px;
  margin: 100px auto 50px;
  color: #3c3c3c;
  padding: 15px 20px;
  box-sizing: border-box;
  scroll-behavior: smooth;
  font-size: 14px;
}
.title {
  line-height: 2;
  font-weight: 600;
  font-size: 16px;
}
.content {
  margin: 10px 0;
}
.footer {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  column-gap: 8px;
}
</style>