<script setup>
import Cart from '@/components/Cart.vue';
import { getProducts } from '@/services/productService';
import { useCartStore } from '@/stores/cartStore';

const cartStore = useCartStore();

// Optional: Fetch products if needed
// const prodotti = await getProducts('https://deploy-django-backend.onrender.com/api/v1/scarpe');

// Debug logs
console.log({ items: cartStore.items });
console.log({ totalItems: cartStore.totalItems });


</script>

<template>
  <div class="cart-page">
    <Cart :data="cartStore.items" />
    
    <div class="cart-summary">
      <div class="summary-header">
        <h2 class="summary-title">Riepilogo ordine</h2>
      </div>
      
      <div class="summary-content">
        <div class="summary-row" v-for="item in cartStore.items" :key="item.id">
            <span class="summary-nome">{{ item.nome }} ({{ item.quantity }} unità)</span>
            <span class="summary-prezzo">€ {{ item.prezzo }}</span>
        </div>

        
        <div class="summary-row">
          <span class="summary-label">Subtotale</span>
          
          <span class="summary-value">€ {{ cartStore.subTotale.toFixed(2) }}</span>
        </div>

        <div class="summary-row" v-if="cartStore.totalItems > 0">
          <span class="summary-label">Articoli</span>
          <span class="summary-value">{{ cartStore.totalItems }}</span>
        </div>

        <div class="summary-row">
          <span class="summary-label">Risparmio</span>
          <span class="summary-value">€ {{ cartStore.risparmio.toFixed(2) }}</span>
        </div>
        
        
        
        <div class="summary-divider"></div>
        
        <div class="summary-row total-row">
          <span class="summary-label total-label">Totale</span>
          <span class="summary-value total-value">€ {{ cartStore.totaleScontato.toFixed(2) }}</span>
        </div>
      </div>
      
      <div class="summary-actions">
        <button 
          type="button" 
          @click="cartStore.clearCart"
          class="clear-cart-btn"
          :disabled="cartStore.totalItems === 0"
        >
          Svuota carrello
        </button>
        
        <button 
          type="button" 
          @click="checkout"
          class="checkout-btn"
          :disabled="cartStore.totalItems === 0"
        >
          Procedi all'acquisto
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-page {
    display: flex;
    justify-content: space-evenly;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  background: #f5f7fa;
}

.cart-summary {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  margin-top: 30px;
  padding: 24px;
  position: sticky;
  /* position: absolute; */
  top: 120px;
  right: 20px;
  width: 40%;
  height: fit-content;
}

.summary-header {
  margin-bottom: 20px;
}

.summary-title {
  color: #2c3e50;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  padding-bottom: 12px;
  border-bottom: 2px solid #e9ecef;
}

.summary-content {
  margin-bottom: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.summary-label {
  color: #6c757d;
  font-size: 14px;
}

.summary-value {
  color: #2c3e50;
  font-size: 16px;
  font-weight: 500;
}

.summary-divider {
  height: 1px;
  background: #e9ecef;
  margin: 12px 0;
}

.total-row {
  padding: 12px 0 8px 0;
}

.total-label {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
}

.total-value {
  font-size: 24px;
  font-weight: 700;
  color: #28a745;
}

.summary-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.clear-cart-btn,
.checkout-btn {
  flex: 1;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 150px;
}

.clear-cart-btn {
  background: #f8f9fa;
  color: #dc3545;
  border: 2px solid #dc3545;
}

.clear-cart-btn:hover:not(:disabled) {
  background: #dc3545;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
}

.clear-cart-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.checkout-btn {
  background: #28a745;
  color: white;
}

.checkout-btn:hover:not(:disabled) {
  background: #218838;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
}

.checkout-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* Responsive Design */
@media (max-width: 768px) {
  .cart-page {
    padding: 10px;
  }
  
  .cart-summary {
    padding: 16px;
    margin-top: 20px;
    border-radius: 8px;
    position: static;
  }
  
  .summary-title {
    font-size: 18px;
  }
  
  .total-value {
    font-size: 20px;
  }
  
  .summary-actions {
    flex-direction: column;
  }
  
  .clear-cart-btn,
  .checkout-btn {
    width: 100%;
    padding: 14px;
    font-size: 15px;
  }
}

/* Animation for summary updates */
.cart-summary {
  animation: slideUp 0.4s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hover effect for rows */
.summary-row:hover {
  background: #f8f9fa;
  border-radius: 4px;
  padding-left: 8px;
  padding-right: 8px;
  transition: background 0.2s ease;
}

/* Empty cart state styling */
.cart-summary:has(.empty-cart) {
  opacity: 0.7;
}

/* Badge for item count */
.summary-value:has(.badge) {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>

