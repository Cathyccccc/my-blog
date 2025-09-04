<template>
  <button :class="buttonClass">
    <slot></slot>
  </button>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  type: {
    // 按钮类型 ('default', 'primary', 'danger', 'link')
    type: String,
    default: "default",
  },
  shape: {
    // 按钮形状 (default, 'round', 'circle')
    type: String,
    default: "default",
  },
  size: {
    // 按钮大小 ('small', 'middle', 'large')
    type: String,
    default: "middle",
  },
  block: {
    // 按钮是否撑开 ('block' or 'inline-block')
    type: Boolean,
    default: false,
  },
});

const buttonClass = computed(() => {
  const baseClass =
    "inline-block w-fit cursor-pointer outline-none leading-none transition flex justify-center items-center";
  let types = {
    default:
      "bg-white border border-transparent text-gray-700 shadow-sm border hover:text-violet-500",
    primary:
      "bg-violet-500 text-white hover:bg-violet-500/80 shadow-sm",
    danger: "bg-rose-500 text-white hover:bg-rose-500/80 shadow-sm",
    link: "text-blue-600 hover:text-blue-400",
  };
  const shapes = {
    default: "rounded-md",
    round: "rounded-full",
    circle: "rounded-full",
  };
  let sizes = {
    small: "px-2 py-2 text-base sm:text-sm h-8 box-border",
    middle: "px-4 py-3 text-lg sm:text-base h-10 box-border",
    large: "px-6 py-4 text-xl sm:text-lg h-12 box-border",
  };
  const block = "w-full block";
  if (props.shape === "circle") {
    sizes = {
      small: "p-2 text-sm w-8 h-8 box-border",
      middle: "p-2 text-base w-10 h-10 box-border",
      large: "p-2 text-lg w-12 h-12 box-border",
    };
    types.link = types.default; // 为 circle 时 link 失效，仍然显示默认样式
  }
  return [
    baseClass,
    types[props.type],
    shapes[props.shape],
    sizes[props.size],
    props.block && block,
  ]
    .join(" ")
    .trimEnd();
});
</script>

<style scoped>
/* button {
  cursor: pointer;
  outline: none;
  border: none;
  line-height: 1;
  font-size: 14px;
  border-radius: 5px;
  font-family: inherit;
  transition: all .3s;
} */
/* button:hover {
  opacity: .8;
} */
/* button:not(.circle) {
  padding: 4px 12px;
  height: 32px;
} */
/* .default {
  background-color: #fff;
  border: 1px solid #eee;
  transition: all .3s;
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
  transition: all .3s;
}
.link:active {
  color: #00BBFF;
} */
/* 设置按钮形状 */
/* .circle {
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
} */
/* 设置按钮大小 */
/* .small:not(.circle) {
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
} */
</style>
