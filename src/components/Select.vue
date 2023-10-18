<template>
  <div class="select-container" tabindex="-1" @blur.capture="handleBlur" ref="selectContainerRef">
    <div class="selector" :class="{ 'focus': focusRef }" @mousedown.prevent="toggleSelectList"
      @focus.capture="handleFocus">
      <div v-if="!mode" class="selected-item">{{ selected && selected.label }}</div>
      <template v-else>
        <div v-for="item in selected" :key="item.value" class="selected-item multiple">
          <span>{{ item.label }}</span>
          <svg @mousedown.stop.prevent="removeSelect(item.value)" t="1695718016457" class="icon" viewBox="0 0 1024 1024"
            version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="940" width="20" height="20">
            <path
              d="M557.312 513.248l265.28-263.904c12.544-12.48 12.608-32.704 0.128-45.248-12.512-12.576-32.704-12.608-45.248-0.128l-265.344 263.936-263.04-263.84C236.64 191.584 216.384 191.52 203.84 204 191.328 216.48 191.296 236.736 203.776 249.28l262.976 263.776L201.6 776.8c-12.544 12.48-12.608 32.704-0.128 45.248 6.24 6.272 14.464 9.44 22.688 9.44 8.16 0 16.32-3.104 22.56-9.312l265.216-263.808 265.44 266.24c6.24 6.272 14.432 9.408 22.656 9.408 8.192 0 16.352-3.136 22.592-9.344 12.512-12.48 12.544-32.704 0.064-45.248L557.312 513.248z"
              p-id="941"></path>
          </svg>
        </div>
      </template>
      <input type="text" ref="inputRef" :style="{ opacity: mode ? 1 : 0 }">
    </div>
    <Transition>
      <div class="toggle-wrapper" v-if="open" ref="toggleWrapperRef">
        <ul v-if="options.length > 0" class="select-list">
          <li v-for="item in options" :key="item.value"
            :class="{ selected: mode === 'multiple' ? value.includes(item.value) : value === item.value }"
            @click="changeSelect(item.value)">
            <span>{{ item.label }}</span>
            <svg v-if="mode === 'multiple' && value.includes(item.value)" t="1697609187051" class="icon"
              viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1343" id="mx_n_1697609187051"
              width="20" height="20">
              <path
                d="M761.906212 445.517843c-8.29492-11.749602-24.579815-14.544251-36.360116-6.250354L416.577209 656.558373 304.674583 499.339656c-8.292873-11.779278-24.564465-14.573927-36.33044-6.28003-11.778254 8.324596-14.572904 24.580838-6.277984 36.361139L388.992967 707.942671c8.293897 11.778254 24.565489 14.57188 36.344766 6.28003l330.318124-232.343719C767.405459 473.584062 770.230808 457.298144 761.906212 445.517843z"
                fill="#090103" p-id="1344"></path>
            </svg>
          </li>
        </ul>
        <Empty v-else class="empty" />
      </div>
    </Transition>
  </div>
</template>
<script setup>
import { computed, ref, watch, onUpdated } from 'vue';
import Empty from './Empty.vue';

const props = defineProps({
  value: {}, // 选中项的值（v-model)
  options: { // 下拉列表选项数据
    type: Array,
    default: []
  },
  mode: { // 是单选还是多选
    type: String,
  },
})
// const { options } = props; // props解构，数据会失去响应性。因此官方建议直接通过prop.来使用数据，或通过toRef()和toRefs()将数据转为响应式
const emit = defineEmits(['update:value', 'change', 'focus', 'blur']);
const inputRef = ref(null);
const selectContainerRef = ref(null);
const open = ref(false); // 控制是否显示下拉选项列表
const focusRef = ref(false);
// 计算属性
// 计算选中的标签数据
const selected = computed(() => {
  if (props.mode === 'multiple') {
    return props.options.filter(item => {
      return props.value.findIndex(i => i === item.value) !== -1;
    })
  } else {
    return props.options.filter(item => item.value === props.value)[0];
  }
})
// const toggleWrapperRef = ref(null);
// onUpdated(() => {
//   if (toggleWrapperRef.value) {
//     console.log(selectContainerRef.value.offsetTop)
//     console.log(selectContainerRef.value.clientHeight)
//   }
// })
// 添加选中标签
function changeSelect(value) {
  if (!props.mode) {
    open.value = false;
    emit('update:value', value);
    emit('change', value)
  } else {
    let list;
    if (props.value.includes(value)) {
      list = props.value.filter(item => item !== value);
    } else {
      list = [...props.value, value];
    }
    emit('update:value', list);
    emit('change', list);
  }
}
// （多选）移除选中标签
function removeSelect(value) {
  const list = props.value.filter(item => item !== value);
  emit('update:value', list);
  emit('change', list);
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
    emit('focus');
  }
}
// 处理失焦
function handleBlur(e) {
  if (e.relatedTarget !== inputRef.value && e.relatedTarget !== selectContainerRef.value) {
    open.value = false;
    focusRef.value = false;
    emit('blur');
  }
  // console.log(e)
  // isTrusted: true
  // _vts: 1697596831997
  // bubbles: false
  // cancelBubble: false
  // cancelable: false
  // composed: true
  // currentTarget: null
  // defaultPrevented: false
  // detail: 0
  // eventPhase: 0
  // relatedTarget: div.select-container
  // returnValue: true
  // sourceCapabilities: InputDeviceCapabilities {firesTouchEvents: false}
  // srcElement: input
  // target: input
  // timeStamp: 20198.099999904633
  // type: "blur"
  // view: Window {0: Window, window: Window, self: Window, document: document, name: '', location: Location, …}
  // which: 0
  // [[Prototype]]: FocusEvent
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
  width: 300px;
  padding: 1px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  transition: border-color .3s;
}

.selector.focus {
  border-color: #55BBFF;
}

.selected-item {
  height: 26px;
  font-size: 14px;
  padding: 3px 2px;
  box-sizing: border-box;
  color: #3c3c3c;
}

.selected-item.multiple {
  background-color: #fff9d2;
  border-radius: 3px;
  display: flex;
  align-items: center;
  margin: 1px 2px;
}

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
  outline: none;
  border: none;
  width: 4px;
  height: 24px;
  line-height: 24px;
  padding: 0;
  /* 控制focus时闪烁线的长度，font-size越大，线越长 */
  font-size: 16px;
  margin-left: 2px;
}

.toggle-wrapper {
  width: 100%;
  position: absolute;
  margin-top: 3px;
  z-index: 99;
  padding: 5px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 7px 20px #e3e3e3;
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
  padding: 3px 5px;
  box-sizing: border-box;
  border-radius: 5px;
  transition: background-color .3s;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}

li.selected {
  background-color: #fff9d2;
}

.select-list li:not(.selected):hover {
  background-color: #F7F7F7;
}

.empty {
  width: 100%;
}

.v-enter-active {
  animation: toggle .15s;
  transform-origin: 0 -5px;
}

.v-leave-active {
  animation: toggle .15s reverse;
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
}</style>