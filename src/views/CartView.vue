<script setup>
import Cart from '@/components/Cart.vue'
import { getProducts } from '@/services/productService';
import { useCartStore } from '@/stores/cartStore';

const cartStore = useCartStore();
// const prodotti = await getProducts('https://deploy-django-backend.onrender.com/api/v1/scarpe')
console.log({items: cartStore.items})
console.log({totalItems: cartStore.totalItems})

</script> 

<template>
    <Cart
    :data="cartStore.items"
    >
    </Cart>
    <h2>Totale</h2>
    <p>€ {{ cartStore.totalPrice.toFixed(2) }}</p>
    <button type="button" @click="cartStore.clearCart">Clear cart</button>
</template>