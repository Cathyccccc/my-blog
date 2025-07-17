<template>
  <div
    class="select-container w-full"
    tabindex="-1"
    @blur.capture="handleBlur"
    ref="selectContainerRef"
  >
    <div
      class="selector"
      :class="{ focus: focusRef }"
      @mousedown.prevent.self="toggleSelectList"
      @focus.capture="handleFocus"
    >
      <!-- 上面这里如果mousedown不加prevent后缀会影响input的聚焦效果，不知道什么原因。self是只有点击元素自己才toggle，比如点击内部tag时不toggle -->
      <div v-if="!mode" class="selected-item">{{ selected && selected.label }}</div>
      <div v-else class="inline-block">
        <Tag
          v-for="item in selected"
          :key="item.value"
          class="mr-1 bg-slate-100"
          size="small"
          type="info"
          closable
          @close="removeSelect(item.value)"
          >{{ item.label }}</Tag
        >
      </div>
      <input
        type="text"
        ref="inputRef"
        v-model="inputValRef"
        autocomplete="off"
        :style="{ opacity: mode ? 1 : 0, width: inputWidth }"
        @input="handleInput"
        @compositionupdate="handleCompositionUpdate"
      />
      <span ref="calculateRef" class="invisible whitespace-pre absolute text-sm"></span>
    </div>
    <!-- 下拉列表选项 -->
    <Transition>
      <div class="toggle-wrapper bg-white dark:bg-[--dark-nav-bg-color] shadow-md" v-if="open" ref="toggleWrapperRef">
        <ul v-if="newOptions.length > 0" class="select-list">
          <li
            v-for="item in newOptions"
            :key="item.label"
            :class="[{ selected: mode ? value.includes(item.value) : value === item.value }, 'bg-white dark:bg-[--dark-line-color]']"
            @click="changeSelect(item.value)"
          >
            <span class="dark:text-black">{{ item.label }}</span>
            <svg
              v-if="mode && value.includes(item.value)"
              t="1697609187051"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1343"
              id="mx_n_1697609187051"
              width="20"
              height="20"
            >
              <path
                d="M761.906212 445.517843c-8.29492-11.749602-24.579815-14.544251-36.360116-6.250354L416.577209 656.558373 304.674583 499.339656c-8.292873-11.779278-24.564465-14.573927-36.33044-6.28003-11.778254 8.324596-14.572904 24.580838-6.277984 36.361139L388.992967 707.942671c8.293897 11.778254 24.565489 14.57188 36.344766 6.28003l330.318124-232.343719C767.405459 473.584062 770.230808 457.298144 761.906212 445.517843z"
                fill="#6610f2"
                p-id="1344"
              ></path>
            </svg>
          </li>
        </ul>
        <Empty v-else class="empty" />
      </div>
    </Transition>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
import Empty from "./Empty.vue";
import Tag from "./Tag.vue";

// Select 组件描述：
// 支持：单选，多选，tag三种模式
// 多选和tag模式的区别在于：tag可以在组件中自动新增选项（选中时新增，新增的数据需要手动通过select事件在父组件中更新options）

const props = defineProps({
  value: {
    // 选中项的值（v-model)
    type: [String, Array],
    default: () => [],
    required: true,
  },
  options: {
    // 下拉列表选项数据
    type: Array,
    default: () => [],
  },
  mode: {
    // 多选模式（multiple）或标签模式（tag），不传则为单选模式
    type: String,
  },
});
const emit = defineEmits(["update:value", "change", "focus", "blur", "deselect", "select"]);

const inputRef = ref(null); // input元素的引用
const inputValRef = ref(""); // input的值
const calculateRef = ref(""); // 用于计算input宽度的隐藏元素
const selectContainerRef = ref(null);
const newWidth = ref(4);
const open = ref(false); // 控制是否显示下拉选项列表
const focusRef = ref(false);

// 当为多选时计算input内容变化时input的宽度
const inputWidth = computed(() => {
  return props.mode === "tag" ? `${newWidth.value}px` : "4px"; // 计算input的宽度，8px为每个字符的平均宽度
});

const newOptions = computed(() => {
  // 依赖的响应式数据：
  // 1. props.mode
  // 2.inputValRef
  // 3.props.options
  // 判断props.options中是否包含inputValRef.value的值，如果包含则不添加，否则添加
  if (props.mode === "tag" && inputValRef.value) {
    const hasInputValue = props.options.some((item) => item.value === inputValRef.value);
    if (!hasInputValue) {
      return [{ label: inputValRef.value, value: inputValRef.value }].concat(props.options);
    }
  }
  return props.options;
});

// 计算选中的标签数据
const selected = computed(() => {
  console.log('value：', props.value)
  const selectedList = newOptions.value.filter((item) => props.value.includes(item.value));
  console.log('selectedList', selectedList)
  return props.mode ? selectedList : selectedList[0];
})
// input输入为英文时计算input宽度
function handleInput() {
  open.value = true;
  calculateRef.value.textContent = inputValRef.value;
  newWidth.value = calculateRef.value.offsetWidth + 4;
}
// input输入为中文时计算input宽度（输入状态input框内暂时显示的是拼音，需要进行处理）
function handleCompositionUpdate(event) {
  calculateRef.value.textContent = inputValRef.value + event.data;
  newWidth.value = calculateRef.value.offsetWidth + 4;
}

// 添加选中标签
function changeSelect(value) {
  console.log('选中标签', value)
  if (!props.mode) {
    open.value = false;
    emit("update:value", value);
    emit("change", value, value); // 参数1：选中或取消选中的值（id/value)，参数2：选中选项（单选是一个值，mode时为选中值组成的数组）
  } else {
    let list;
    if (props.value.includes(value)) {
      // 删除选择
      list = props.value.filter((item) => item !== value);
      emit("deselect", value);
    } else {
      // 添加选择
      list = [...props.value, value];
      emit("select", value);
    }
    emit("update:value", list);
    emit("change", value, list);
    if (props.mode === "tag" && value === inputValRef.value) {
      // 如果是tag模式且选中的是输入的内容，则清空输入框
      inputValRef.value = "";
    }
  }
}
// （多选）移除选中标签
function removeSelect(value) {
  const list = props.value.filter((item) => item !== value);
  emit("update:value", list);
  emit("change", value, list);
  emit("deselect", value);
}
// 展示/隐藏标签列表
function toggleSelectList() {
  open.value = !open.value;
  if (open.value) {
    inputRef.value.focus();
  }
  focusRef.value = true;
}
// 处理聚焦
function handleFocus(e) {
  if (!e.relatedTarget) {
    emit("focus");
  }
}
// 处理失焦
function handleBlur(e) {
  if (e.relatedTarget !== inputRef.value && e.relatedTarget !== selectContainerRef.value) {
    open.value = false;
    focusRef.value = false;
    emit("blur");
  }
}
</script>

<style scoped>
.select-container {
  display: inline-block;
  position: relative;
  vertical-align: middle;
}

.selector {
  min-height: 32px;
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 1px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  transition: border-color 0.3s;
}

.selector.focus {
  border-color: #55bbff;
}

.selected-item {
  height: 26px;
  font-size: 14px;
  padding: 3px 2px;
  box-sizing: border-box;
  color: #3c3c3c;
}

/* .selected-item.multiple {
  background-color: #fff9d2;
  border-radius: 3px;
  display: flex;
  align-items: center;
  margin: 1px 2px;
} */

.selected-item svg {
  width: 14px;
  height: 14px;
  margin-left: 5px;
  cursor: pointer;
}

.selected-item svg path {
  fill: #b5b5b5;
  transition: all 0.3s;
}

.selected-item svg:hover path {
  fill: #000;
}

input {
  width: 100%;
  min-width: 4px;
  outline: none;
  border: none;
  height: 24px;
  line-height: 24px;
  padding: 0;
  /* 控制focus时闪烁线的长度，font-size越大，线越长 */
  font-size: 14px;
  margin-left: 2px;
}

.toggle-wrapper {
  width: 100%;
  position: absolute;
  margin-top: 3px;
  z-index: 99;
  padding: 5px;
  box-sizing: border-box;
  /* background-color: #fff; */
  border-radius: 5px;
  /* box-shadow: 0 7px 20px #e3e3e3; */
}

.select-list {
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
}

.select-list::-webkit-scrollbar {
  width: 10px;
  background-color: #fff;
}

.select-list::-webkit-scrollbar-thumb {
  background-color: #a5a5a5;
  border-radius: 10px;
}

.select-list li {
  font-size: 14px;
  height: 30px;
  line-height: 24px;
  padding: 3px 8px;
  box-sizing: border-box;
  border-radius: 6px;
  /* transition: background-color 0.3s; */
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}
.select-list li:not(:last-child) {
  margin-bottom: 3px;
}

li.selected {
  background-color: var(--theme-color);
}

.select-list li:not(.selected):hover {
  background-color: #f7f7f7;
}

.empty {
  width: 100%;
}

.v-enter-active {
  animation: toggle 0.15s;
  transform-origin: 0 -5px;
}

.v-leave-active {
  animation: toggle 0.15s reverse;
  transform-origin: 0 -5px;
}

@keyframes toggle {
  0% {
    transform: scaleY(0);
    opacity: 0;
  }

  100% {
    transform: scaleY(1);
    opacity: 1;
  }
}
</style>
