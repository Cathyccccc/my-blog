<template>
  <div class="date-picker-container" tabindex="-1" ref="datePickerContainerRef" @blur.capture="handleBlur">
    <div class="date-picker" @click="handleClick">
      <input v-bind="$attrs" :value="value" ref="inputRef">
      <svg t="1698557982011" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="1147" width="18" height="18">
        <path
          d="M896 448H128v447.957333l477.738667 0.021334L896 895.957333V448z m0-42.666667V192.042667C896 192 768 192 768 192V149.333333h128.042667A42.666667 42.666667 0 0 1 938.666667 192.042667v703.914666A42.624 42.624 0 0 1 896.064 938.666667H127.936A42.666667 42.666667 0 0 1 85.333333 895.957333V192.042667C85.333333 168.469333 104.256 149.333333 127.957333 149.333333H256v42.666667l-128 0.042667V405.333333h768zM298.666667 85.333333h42.666666v170.666667h-42.666666V85.333333z m384 0h42.666666v170.666667h-42.666666V85.333333zM384 149.333333h256v42.666667H384V149.333333z"
          fill="#ddd" p-id="1148"></path>
      </svg>
    </div>
    <Transition>
      <div class="calender-tab" v-show="visible">
        <div class="top">
          <svg t="1698562756018" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="1209" width="18" height="18" @mousedown.prevent="handleChangeYear(-1)">
            <path
              d="M842.666667 864c-8.533333 0-14.933333-2.133333-21.333334-8.533333l-341.333333-309.333334c-6.4-6.4-10.666667-14.933333-10.666667-23.466666 0-8.533333 4.266667-17.066667 10.666667-23.466667l341.333333-309.333333c12.8-12.8 34.133333-10.666667 44.8 2.133333 12.8 12.8 10.666667 34.133333-2.133333 44.8L548.266667 522.666667l315.733333 285.866666c12.8 10.666667 14.933333 32 2.133333 44.8-6.4 6.4-14.933333 10.666667-23.466666 10.666667z"
              fill="#ddd" p-id="1210"></path>
            <path
              d="M512 864c-8.533333 0-14.933333-2.133333-21.333333-8.533333L149.333333 546.133333c-6.4-6.4-10.666667-14.933333-10.666666-23.466666 0-8.533333 4.266667-17.066667 10.666666-23.466667L490.666667 189.866667c12.8-12.8 34.133333-10.666667 44.8 2.133333 12.8 12.8 10.666667 34.133333-2.133334 44.8L217.6 522.666667 533.333333 808.533333c12.8 12.8 14.933333 32 2.133334 44.8-6.4 6.4-14.933333 10.666667-23.466667 10.666667z"
              fill="#ddd" p-id="1211"></path>
          </svg>
          <svg t="1698562782362" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="1353" width="18" height="18" @mousedown.prevent="handleChangeMonth(-1)">
            <path
              d="M259.497149 496.384347c-0.00307 0.005117-0.00614 0.010233-0.008186 0.01535-0.240477 0.438998-0.470721 0.88516-0.690732 1.336438-0.00921 0.01842-0.01842 0.035816-0.027629 0.053212-0.210801 0.432859-0.409322 0.87288-0.600681 1.316995-0.016373 0.037862-0.034792 0.074701-0.051165 0.112564-0.183172 0.429789-0.354064 0.865717-0.51984 1.305739-0.019443 0.053212-0.042979 0.104377-0.062422 0.157589-0.154519 0.418532-0.295735 0.842181-0.432859 1.2689-0.024559 0.076748-0.053212 0.152473-0.077771 0.230244-0.128937 0.413416-0.245593 0.831948-0.35918 1.252527-0.024559 0.092098-0.054235 0.183172-0.077771 0.275269-0.103354 0.398066-0.192382 0.801249-0.280386 1.205455-0.025583 0.118704-0.057305 0.23536-0.081864 0.354064-0.078795 0.381693-0.143263 0.769526-0.207731 1.156336-0.024559 0.143263-0.054235 0.285502-0.076748 0.428765-0.058328 0.3776-0.101307 0.759293-0.146333 1.140986-0.01842 0.156566-0.042979 0.311085-0.059352 0.467651-0.039909 0.394996-0.065492 0.793062-0.091074 1.192152-0.00921 0.147356-0.025583 0.292666-0.033769 0.440022-0.027629 0.547469-0.041956 1.098008-0.041956 1.65264s0.014326 1.105171 0.041956 1.65264c0.007163 0.147356 0.023536 0.292666 0.033769 0.440022 0.025583 0.399089 0.051165 0.797156 0.091074 1.192152 0.016373 0.157589 0.040932 0.311085 0.059352 0.467651 0.045025 0.381693 0.088004 0.763386 0.146333 1.140986 0.022513 0.144286 0.052189 0.285502 0.076748 0.428765 0.064468 0.38681 0.12996 0.773619 0.207731 1.156336 0.024559 0.118704 0.056282 0.23536 0.081864 0.354064 0.088004 0.404206 0.178055 0.807389 0.280386 1.205455 0.023536 0.093121 0.053212 0.183172 0.077771 0.275269 0.112564 0.420579 0.229221 0.839111 0.35918 1.252527 0.024559 0.077771 0.053212 0.152473 0.077771 0.230244 0.137123 0.426719 0.278339 0.850367 0.432859 1.2689 0.019443 0.053212 0.041956 0.104377 0.062422 0.157589 0.164752 0.438998 0.335644 0.87595 0.51984 1.305739 0.016373 0.037862 0.034792 0.074701 0.051165 0.112564 0.191358 0.444115 0.38988 0.883113 0.600681 1.316995 0.00921 0.01842 0.01842 0.035816 0.027629 0.053212 0.220011 0.451278 0.450255 0.89744 0.690732 1.336438 0.00307 0.005117 0.00614 0.010233 0.008186 0.01535 1.497097 2.728134 3.381004 5.213745 5.578042 7.384178l-0.022513 0.022513 383.934253 351.620289c5.78782 5.791913 13.785981 9.374508 22.621207 9.374508 17.662265 0 31.980365-14.3181 31.980365-31.980365 0-8.834202-3.582595-16.832364-9.373485-22.620184L334.406233 511.738034 694.213995 182.581362c5.79089-5.78782 9.373485-13.784958 9.373485-22.620184 0-17.662265-14.3181-31.980365-31.980365-31.980365-8.835226 0-16.833387 3.582595-22.621207 9.374508l-383.934253 351.620289 0.022513 0.022513c0 0 0 0 0 0C262.878153 491.170602 260.994246 493.65519 259.497149 496.384347z"
              fill="#ddd" p-id="1354"></path>
          </svg>
          <div class="year-month">
            <span>{{ monthRef }}</span>
            <span>{{ yearRef }}</span>
          </div>
          <svg t="1698562808737" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="1496" width="18" height="18" @mousedown.prevent="handleChangeMonth(1)">
            <path
              d="M320 885.333333c-8.533333 0-17.066667-4.266667-23.466667-10.666666-12.8-12.8-10.666667-34.133333 2.133334-44.8L654.933333 512 298.666667 194.133333c-12.8-10.666667-14.933333-32-2.133334-44.8 10.666667-12.8 32-14.933333 44.8-2.133333l384 341.333333c6.4 6.4 10.666667 14.933333 10.666667 23.466667 0 8.533333-4.266667 17.066667-10.666667 23.466667l-384 341.333333c-6.4 6.4-12.8 8.533333-21.333333 8.533333z"
              fill="#ddd" p-id="1497"></path>
          </svg>
          <svg t="1698562817135" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="1639" width="18" height="18" @mousedown.prevent="handleChangeYear(1)">
            <path
              d="M544 522.666667c0-8.533333-4.266667-17.066667-10.666667-23.466667L192 189.866667c-12.8-12.8-34.133333-10.666667-44.8 2.133333-12.8 12.8-10.666667 34.133333 2.133333 44.8l315.733334 285.866667L149.333333 808.533333c-12.8 12.8-14.933333 32-2.133333 44.8 6.4 6.4 14.933333 10.666667 23.466667 10.666667 8.533333 0 14.933333-2.133333 21.333333-8.533333l341.333333-309.333334c6.4-6.4 10.666667-14.933333 10.666667-23.466666z"
              fill="#ddd" p-id="1640"></path>
            <path
              d="M864 499.2l-341.333333-309.333333c-12.8-12.8-34.133333-10.666667-44.8 2.133333-12.8 12.8-10.666667 34.133333 2.133333 44.8l315.733333 285.866667-315.733333 285.866666c-12.8 12.8-14.933333 32-2.133333 44.8 6.4 6.4 14.933333 10.666667 23.466666 10.666667 8.533333 0 14.933333-2.133333 21.333334-8.533333l341.333333-309.333334c6.4-6.4 10.666667-14.933333 10.666667-23.466666 0-8.533333-4.266667-17.066667-10.666667-23.466667z"
              fill="#ddd" p-id="1641"></path>
          </svg>
        </div>
        <div class="middle">
          <table>
            <thead>
              <tr>
                <th v-for="i in week" :key="i"> {{ i }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(arr, index) in daysArrRef" :key="index">
                <td v-for="(i, idx) in arr" :key="idx" :class="{active: currentDay === i}" @mousedown.prevent="handleChangeDay(i)">{{ i }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="bottom"></div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { week } from '../../public/js/constant';
import { formatDaysAsWeek, getDate } from '../utils/date';
const props = defineProps({
  value: {
    type: String,
    default: 'xxxx/xx/xx',
  }
})

const emit = defineEmits(['update:value'])

const visible = ref(false);
function handleClick() {
  visible.value = true;
}

const dateRef = reactive(new Date());
const yearRef = ref(dateRef.getFullYear());
const monthRef = ref(dateRef.toDateString().split(' ')[1]);
const daysArrRef = ref(formatDaysAsWeek(dateRef));
const currentDay = ref(dateRef.getDate())

function handleChangeDay(day) {
  dateRef.setDate(day);
  currentDay.value = dateRef.getDate();
  const dateStr = getDate(dateRef);
  emit('update:value', dateStr);
  visible.value = false;
}

function handleChangeMonth(num) {
  let month = dateRef.getMonth() + num;
  let year = dateRef.getFullYear();
  if (month > 11) {
    year = year + 1
  }
  if (month < 0) {
    year = year - 1;
  }
  dateRef.setMonth(month);
  dateRef.setFullYear(year);
  monthRef.value = dateRef.toDateString().split(' ')[1];
  yearRef.value = year;
  console.log(dateRef)
  daysArrRef.value = formatDaysAsWeek(dateRef);
}

function handleChangeYear(num) {
  const year = dateRef.getFullYear() + num;
  dateRef.setFullYear(year);
  yearRef.value = year;
  daysArrRef.value = formatDaysAsWeek(dateRef);
}

const inputRef = ref(null);
const datePickerContainerRef = ref(null);
function handleBlur(e) {
  if (e.relatedTarget !== inputRef.value && e.target !== datePickerContainerRef.value) {
    visible.value = false;
  }
}
</script>

<style scoped>
.date-picker-container {
  height: 32px;
  border: 1px solid #eee;
  border-radius: 5px;
  width: 300px;
  padding: 0 2px;
  box-sizing: border-box;
  transition: border-color .3s;
}

.date-picker-container:focus, .date-picker-container:hover {
  border-color: #55BBFF;
}

.date-picker {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

input {
  outline: none;
  border: none;
  flex: 1 1 auto;
}

.date-picker svg {
  margin: 0 5px;
}

.calender-tab {
  width: 250px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  position: relative;
  top: 3px;
}

.calender-tab .top {
  height: 35px;
  display: flex;
  align-items: center;
  padding: 0 5px;
  box-sizing: border-box;
}
.top svg {
  cursor: pointer;
  transition: fill .3s;
}
.top svg:hover path {
  fill: #55BBFF;
}
.top .year-month {
  flex: 1 1 auto;
  text-align: center;
}
.year-month span {
  margin: 0 3px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: color .3s;
}
.year-month span:hover {
  color: #55BBFF;
}
.top svg {
  margin: 0 2px;
}
.calender-tab .middle {
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
}
.middle table {
  width: 100%;
  border-collapse: collapse;
}
tr {
  display: flex;
  justify-content: start;
  height: 30px;
  line-height: 30px;
  column-gap: 5px;
  margin: 0 5px;
}
th, td {
  width: 30px;
  box-sizing: border-box;
  text-align: center;
  border-radius: 5px;
  transition: background-color .3s;
}
td.active {
  border: 1px solid #55BBFF;
}
td {
  cursor: pointer;
}
td:hover {
  background-color: #eee;
}
.calender-tab .bottom {
  height: 35px;
}
/* transition */
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
}
</style>