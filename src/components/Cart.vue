<template>
  <!-- <Teleport to="app">
        <Modal></Modal>
    </Teleport> -->
  <!-- <div class="items-container"> -->
    <h2>Prodotti nel carrello</h2>

    <!-- <ul v-for="item in data" :key="item.id">
      <li id="item-li">
        {{ item.nome }} € {{ item.prezzo_scontato.toFixed(2) }}
        <span v-if="item.sconto !== 0">{{ item.sconto }}%</span>
        <button @click="cartStore.rimuoviItem(item.id)">Rimuovi</button>
        <button @click="cartStore.addOne(item.id)">+</button>
        <span>Quantità {{ item.quantity }}</span>
        <button @click="cartStore.minusOne(item.id)">-</button>
      </li>
    </ul> -->
  <!-- </div> -->
   <ProductCard v-for="item in data" :key="item.id">
    <template #image >
      <img :src="item.image_url" alt="">
    </template>

    <template #content>
      <h2>{{ item.nome }}</h2>
    </template>

    <template #footer>
      <p>€ {{ item.prezzo_scontato }}</p>
    </template>
   </ProductCard>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore.js';
import Modal from './Modal.vue'
import ProductCard from './ProductCard.vue';

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

<style scoped>
#item-li {
  display: flex;
  justify-content: space-between;
}
</style>
