<template>
  <Transition>
    <div class="modal-container" v-if="open">
      <div class="mask"></div>
      <div class="modal" tabindex="-1">
        <div class="modal-content">
          <div class="title">{{ $attrs.title }}</div>
          <div class="content">
            <slot></slot>
          </div>
          <div class="footer">
            <Button @click="handleCancel">{{ cancelText }}</Button>
            <Button type="primary" @click="$emit('onOk')">{{ okText }}</Button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import Button from './Button.vue';
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  okText: {
    type: String,
    default: 'Ok'
  },
  cancelText: {
    type: String,
    default: 'Cancel'
  },
})
const emits = defineEmits(['onCancel', 'onOk', 'update:open'])
function handleBlur() {
  console.log('失焦')
}
// 点击cancel按钮
function handleCancel() {
  emits('update:open', false)
  emits('onCancel')
}
</script>

<style scoped>
.mask,
.modal {
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
  color: #55BBFF;
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

/* transition动画 */
.v-enter-active,
.v-leave-active {
  transition: all .3s;
}
.v-enter-active .modal-content {
  animation: bounce-in 0.3s;
}

.v-leave-active .modal-content {
  animation: bounce-in .3s reverse forwards;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}
.v-enter-active .mask {
  animation: show-in 0.3s;
}
.v-leave-active .mask {
  animation: show-in 0.3s reverse forwards;
}
@keyframes show-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>