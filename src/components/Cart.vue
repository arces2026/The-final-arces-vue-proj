<template>
  <div class="cart-container">
    <h2 class="cart-title">Prodotti nel carrello</h2>

    <div v-if="data.length === 0" class="empty-cart">
      <p>Il carrello è vuoto</p>
    </div>

    <div v-else class="cart-items">
      <ProductCard v-for="item in data" :key="item.id" class="product-card">
        <template #image>
          <div class="badge-wrapper">
            <span class="badge">Sconto {{ item.sconto }} %</span>
            <img :src="item.immagine_url" :alt="item.nome" class="product-image" />
          </div>
        </template>

        <template #content>
          <h3 class="product-name">{{ item.nome }}</h3>
          <p class="product-description">{{ item.descrizione }}</p>
        </template>

        <template #footer>
          <div class="product-footer">
            <div class="price-section">
              <p v-if="item.sconto > 0" class="original-price">€ {{ item.prezzo.toFixed(2) }}</p>
              <p class="current-price" :class="{ discounted: item.sconto > 0 }">
                € {{ item.prezzo_scontato.toFixed(2) }}
              </p>
            </div>

            <div class="quantity-controls">
              <button
                @click="cartStore.minusOne(item.id)"
                class="quantity-btn"
                :disabled="item.quantity <= 1"
              >
                -
              </button>
              <span class="quantity-display">{{ item.quantity }}</span>
              <button @click="cartStore.addOne(item.id)" class="quantity-btn">+</button>
            </div>

            <button @click="cartStore.rimuoviItem(item.id)" class="remove-btn">Rimuovi</button>
          </div>
        </template>
      </ProductCard>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore.js'
import ProductCard from './ProductCard.vue'

const cartStore = useCartStore()

const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => [],
  },
})
</script>

<style scoped>
.cart-container {
  max-width: 400px;
  /* margin: 0 ; */
  padding: 20px;
}

.cart-title {
  color: #2c3e50;
  font-size: 24px;
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e0e0e0;
}

.empty-cart {
  text-align: center;
  padding: 40px;
  background: #f8f9fa;
  border-radius: 8px;
  color: #6c757d;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.product-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  overflow: hidden;
}

.product-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
}

.product-name {
  color: #2c3e50;
  font-size: 18px;
  margin: 0 0 8px 0;
}

.product-description {
  color: #6c757d;
  font-size: 14px;
  margin: 0;
  line-height: 1.5;
}

.product-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

.price-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.original-price {
  color: #6c757d;
  text-decoration: line-through;
  font-size: 14px;
  margin: 0;
}

.current-price {
  color: #28a745;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.current-price.discounted {
  color: #dc3545;
  font-size: 20px;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f8f9fa;
  padding: 5px;
  border-radius: 6px;
}

.quantity-btn {
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.2s ease;
}

.quantity-btn:hover:not(:disabled) {
  background: #e9ecef;
  border-color: #adb5bd;
}

.quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-display {
  min-width: 30px;
  text-align: center;
  font-weight: 500;
  color: #2c3e50;
}

.remove-btn {
  padding: 8px 16px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s ease;
}

.remove-btn:hover {
  background: #c82333;
}

/* Responsive Design */
@media (max-width: 768px) {
  .cart-container {
    padding: 10px;
  }

  .product-footer {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }

  .price-section {
    justify-content: center;
  }

  .quantity-controls {
    justify-content: center;
    width: 100%;
  }

  .remove-btn {
    width: 100%;
    text-align: center;
  }

  .product-image {
    height: 150px;
  }
}

/* Animation for cart updates */
.product-card {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
