<template>
  <!-- <Teleport to="app">
        <Modal></Modal>
    </Teleport> -->
  <div class="items-container">
    <h2>Prodotti nel carrello</h2>
    <ul v-for="item in data" :key="item.id">
      <li>
        {{ item.nome }} € {{ item.prezzo_scontato.toFixed(2) }}
        <span v-if="item.sconto !== 0">{{ item.sconto }}%</span>
        <button @click="cartStore.rimuoviItem(item.id)">Rimuovi</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore.js';
import Modal from './Modal.vue'

const cartStore = useCartStore()
const props = defineProps({
  data: Array,
})

// // define the emit
// const emit = defineEmits(['rimuovi-item'])

// //emit the event when called
// const rimuoviItem = (itemId) => {
//     emit('rimuovi-item', itemId)
// }
</script>

<style></style>
