<template>
  <ul class="tag-nav-container">
    <li
      class="nav"
      :class="{ active: filterKey === item.value }"
      v-for="item in data"
      :key="item.title"
      @click="handleClick(item.value)"
    >
      {{ item.title }}
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  data: Array,
  filterKey: {
    type: String,
    default: 'all'
  }
})
const emit = defineEmits(['update:filterKey', 'filter']);
function handleClick(value) {
  emit('update:filterKey', value);
  emit('filter');
}
</script>

<style scoped>
.tag-nav-container {
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  position: sticky;
  top: 10px;
  margin: 0 10px 10px;
  backdrop-filter: blur(20px);
  background-color: rgba(240, 240, 240, 0.5);
  border-radius: 30px;
}

.nav {
  cursor: pointer;
  font-weight: 600;
  margin: 0 10px;
  transition: color .3s;
}

.nav:hover {
  color: #666;
}

.nav.active {
  color: #55BBFF;
}</style>