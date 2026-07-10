<template>
  <!-- <Teleport to="app">
        <Modal></Modal>
    </Teleport> -->
  <div class="items-container">
    <h2>Prodotti nel carrello</h2>
    <ul v-for="item in data" :key="item.id">
         <li>{{ item.nome }}{{ item.prezzo }}</li>
    </ul>
    </div>
    
</template>

<script setup>
import Modal from './Modal.vue'
const props = defineProps({
    data: Array
})
</script>

<style></style>
