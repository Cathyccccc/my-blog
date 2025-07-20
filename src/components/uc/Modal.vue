<template>
  <!-- 使用的时候可以嵌套Teleport -->
  <Transition>
    <div v-if="open">
      <div class="mask" @click.stop="handleBlur"></div>
      <div class="modal" tabindex="-1">
        <div
          class="modal-content bg-white dark:bg-[--dark-theme-color]"
          v-bind:style="$attrs.style"
        >
          <div class="flex justify-between">
            <p class="text-base-color-switch">{{ $attrs.title }}</p>
            <span
              v-if="closable"
              class="i-tabler:circle-x w-6 h-6 text-gray-400 cursor-pointer"
              @click="$emit('update:open', false)"
            ></span>
          </div>
          <div class="content">
            <slot></slot>
          </div>
          <div class="footer" v-if="$attrs.footer !== null">
            <slot name="footer">
              <Button @click="handleCancel">{{ cancelText }}</Button>
              <Button type="primary" @click="$emit('onOk')">{{ okText }}</Button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import Button from "./Button.vue";
defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  okText: {
    type: String,
    default: "Ok",
  },
  cancelText: {
    type: String,
    default: "Cancel",
  },
  closable: {
    // 是否显示右上角关闭按钮
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(["onCancel", "onOk", "update:open"]);
function handleBlur() {
  console.log("失焦");
}
// 点击cancel按钮
function handleCancel() {
  emits("update:open", false);
  emits("onCancel");
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
  border-radius: 10px;
  width: 520px;
  margin: 100px auto 50px;
  padding: 15px 20px;
  box-sizing: border-box;
  scroll-behavior: smooth;
  font-size: 14px;
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
  transition: all 0.3s;
}
.v-enter-active .modal-content {
  animation: bounce-in 0.3s;
}

.v-leave-active .modal-content {
  animation: bounce-in 0.3s reverse forwards;
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
