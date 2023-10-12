<template>
  <table class="table-container" v-if="filteredData.length">
    <caption>{{ title }}</caption>
    <thead>
      <tr>
        <th v-for="key in columns" :key="key" @click="sortBy(key)" :class="{ active: sortKey == key }">
          {{ key.title }}
          <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'"></span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(entry, index) in filteredData" :key="index">
        <td v-for="key in columns" :key="key.dataIndex">
          <slot name="bodyCell" :column="key" :row="entry">
            {{ typeof entry[key.dataIndex] === 'string' ? entry[key.dataIndex].slice(0, 20) : entry[key.dataIndex]}}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
  <p v-else>No matches found.</p>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    default: []
  },
  columns: {
    type: Array,
    default: []
  },
  filterKey: String,
  title: {
    type: String || Object,
    default: ''
  },

})
// 当存在表格标题（title属性）时，标题左上和右上显示圆角style，否则表头显示圆角style
const sortKey = ref('')
// 将columns的key转为{key： 1}形式，当以当前字段（key）进行排序时，赋值为-1
const sortOrders = ref(
  props.columns.map(item => item.dataIndex).reduce((o, key) => ((o[key] = 1), o), {})
)
const filteredData = computed(() => {
  let { data, filterKey, columns } = props
  // 添加序号（columns中包含index数据项）
  const hasIndex = columns.find(item => item.dataIndex === 'index')
  if (hasIndex) {
    data = data.map((item, index) => ({ ...item, index: index + 1 }))
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
    filterKey = filterKey.toLowerCase()
    data = data.filter((row) => {
      return Object.keys(row).some((key) => {
        return String(row[key]).toLowerCase().indexOf(filterKey) > -1
      })
    })
  }
  const key = sortKey.value
  if (key) {
    const order = sortOrders.value[key]
    data = data.slice().sort((a, b) => {
      a = a[key]
      b = b[key]
      return (a === b ? 0 : a > b ? 1 : -1) * order
    })
  }
  return data
})

function sortBy(key) {
  sortKey.value = key
  sortOrders.value[key] *= -1
}

</script>

<style scoped>
/* 需要添加表格单元格的响应式样式？？？ */
table {
  width: calc(100% - 10px);
  /* min-width: 600px; */
  border-radius: 10px 10px 3px 3px;
  background-color: #F7F7F7;
  /* border-collapse: collapse; */
  margin: 5px;
}

caption {
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  text-align: left;
  padding: 5px 15px;
  box-sizing: border-box;
}

th {
  background-color: #eee;
  color: rgba(0, 0, 0, 0.66);
  cursor: pointer;
  user-select: none;
}

th:nth-child(1) {
  border-top-left-radius: 10px;
}

th:nth-last-child(1) {
  border-top-right-radius: 10px;
}

tbody tr:hover td {
  background-color: #F5F5F5;
}

td {
  background-color: #fff;
  transition: all .3s;
  text-align: center;
}

th,
td {
  /* min-width: 120px; */
  padding: 10px 20px;
  font-size: 14px;
}

th.active {
  color: #000;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #000;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #000;
}
</style>