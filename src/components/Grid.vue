<script setup>
import { ref, computed } from 'vue'
import { getNestedValue, getAllKeys } from '@/utils/objectUtils'

const props = defineProps({
  data: Array,
  columns: Array,
  filterKey: String,
  selectedField: String,
})

defineEmits(['edit-clicked'])

const sortKey = ref('')
const sortOrders = ref(
  props.columns.reduce((o, col) => ((o[col.key] = 1), o), {})
)

const filteredData = computed(() => {
  let { data, filterKey, selectedField } = props
  if (filterKey && data) {
    filterKey = filterKey.toLowerCase()
    data = data.filter((row) => {
      const keysToSearch = selectedField === 'all' ? getAllKeys(row) : [selectedField]
      return keysToSearch.some(keyPath => {
        const value = getNestedValue(row, keyPath)
        return String(value).toLocaleLowerCase().includes(filterKey)
      })
    })
  }
  const key = sortKey.value
  if (key) {
    const order = sortOrders.value[key]
    data = data.slice().sort((a, b) => {
      a = getNestedValue(a, key)
      b = getNestedValue(b, key)
      return (a === b ? 0 : a > b ? 1 : -1) * order
    })
  }
  return data
})

function sortBy(key) {
  sortKey.value = key
  sortOrders.value[key] *= -1
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

</script>


<template>
  <table v-if="filteredData.length">
    <thead>
      <tr>
        <th v-for="col in columns"
          :key="col.key"
          @click="sortBy(col.key)"
          :class="{ active: sortKey == col.key }">
          {{ col.label || capitalize(col.key) }}
          <span class="arrow" :class="sortOrders[col.key] > 0 ? 'asc' : 'dsc'">
          </span>
        </th>
        <th>Azioni</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="entry in filteredData" :entry="entry.id">
        <td v-for="col in columns" :key="col.key">
          {{getNestedValue(entry, col.key)}}
        </td>
        <td><button @click="$emit('edit-clicked', entry.id)">Edit</button></td>
      </tr>
    </tbody>
  </table>
  <p v-else>No matches found.</p>
</template>


<style scoped>
table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #42b983;
  color: rgba(255, 255, 255, 0.66);
  cursor: pointer;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th,
td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: #fff;
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
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}
</style>