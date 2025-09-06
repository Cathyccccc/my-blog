<template>
  <slot name="header"></slot>
  <div class="w-full text-base-color-switch bg-[--theme-color] dark:bg-[#3b1682] shadow-md shadow-slate-100 dark:shadow-[--dark-line-color] transition rounded-md my-2">
    <table :class="['w-full', 'table-auto', 'border-spacing-0', theme]">
      <thead class="w-full">
        <tr>
          <th
            v-for="key in columns"
            :key="key"
            @click="sortBy(key)"
            :class="[
              { active: sortKey == key },
              'h-14',
              'p-4',
              'text-sm',
              'text-left',
              'border-b',
              'line-color-switch',
            ]"
          >
            <div class="flex-inline items-center">
              <span>{{ key.title }}</span>
              <span
                class="w-2.5 h-2.5 ml-2 cursor-pointer before:content-[''] before:border-l-5 
                before:border-r-5 before:border-b-5 before:border-x-transparent before:color-gray-300 
                after:content-[''] after:border-l-5 after:border-r-5 after:border-t-5 
                after:border-x-transparent after:color-gray-300 relative before:absolute 
                after:absolute before:absolute after:top-1/2 after:translate-y-[2px] 
                before:-translate-x-1/2 after:-translate-x-1/2 hover:before:color-gray-500 
                hover:after:color-gray-500 before:transition-colors after:transition-colors"
              ></span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody v-if="filteredData.length" class="w-full">
        <tr v-for="(entry, index) in filteredData" :key="index" class="hover:bg-violet-100 dark:hover:bg-black/40">
          <td
            v-for="key in columns"
            :key="key.dataIndex"
            class="h-14 px-4 py-3 text-sm text-left"
          >
            <slot name="bodyCell" :column="key" :row="entry">
              {{
                typeof entry[key.dataIndex] === "string"
                  ? entry[key.dataIndex].slice(0, 20)
                  : entry[key.dataIndex]
              }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
    <Empty v-if="!data.length" />
    <Loading v-show="loading" />
    <slot name="footer"></slot>
  </div>
</template>

<script setup>
import { computed,ref } from "vue";

import { useTheme } from "@/hooks";

import Empty from "./Empty.vue";
import Loading from "./Loading.vue";

const props = defineProps({
  data: {
    // 表格渲染数据
    type: Array,
    default: () => [],
  },
  columns: {
    // 表格列配置
    type: Array,
    default: () => [],
  },
  filterKey: String,
  title: {
    type: String || Object,
    default: "",
  },
  loading: {
    type: Boolean,
  }
});

const [theme] = useTheme();
const sortKey = ref("");
// 将columns的key转为{key： 1}形式，当以当前字段（key）进行排序时，赋值为-1
const sortOrders = ref(
  props.columns.map((item) => item.dataIndex).reduce((o, key) => ((o[key] = 1), o), {})
);

const filteredData = computed(() => {
  let { data, filterKey, columns } = props;
  // 添加序号（columns中包含index数据项）
  const hasIndex = columns.find((item) => item.dataIndex === "index");
  if (hasIndex) {
    data = data.map((item, index) => ({ ...item, index: index + 1 }));
  }
  // const filterColumns = columns.filter(col => {
  //   return data[0] && !data[0][col.dataIndex]
  // })
  // // 这里必须用map，不能用push？？？
  // filterColumns.forEach(col => {
  //   if (col.dataIndex === 'index') {
  //     data = data.map((item, index) => ({ ...item, index: index + 1 }))
  //   } else {
  //     // data = data.map((item, index) => ({ ...item, [col.dataIndex]: undefined }))
  //   }
  // })
  // 自定义渲染 customRender
  // const customColumns = columns.filter(item => {
  //   return item.hasOwnProperty('customRender')
  // })
  // if (customColumns.length) {
  //   console.log('customRenderRows', customColumns)
  // }
  if (filterKey) {
    filterKey = filterKey.toLowerCase();
    data = data.filter((row) => {
      return Object.keys(row).some((key) => {
        return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
      });
    });
  }
  const key = sortKey.value;
  if (key) {
    const order = sortOrders.value[key];
    data = data.slice().sort((a, b) => {
      a = a[key];
      b = b[key];
      return (a === b ? 0 : a > b ? 1 : -1) * order;
    });
  }
  return data;
});

function sortBy(key) {
  sortKey.value = key;
  sortOrders.value[key] *= -1;
}
</script>

<style scoped>
tbody tr:not(:last-child) td {
  border-bottom: 1px solid var(--line-color);
  transition: border-color .3s cubic-bezier(0.4, 0, 0.2, 1);
}
.dark tbody tr:not(:last-child) td {
  border-bottom: 1px solid var(--dark-line-color);
}
</style>
