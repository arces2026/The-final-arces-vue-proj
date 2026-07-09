import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Import the icons you want to use
import { faUser, faHome, faSignOutAlt, faCartShopping } from '@fortawesome/free-solid-svg-icons'
// Add more as needed

// Add icons to the library
library.add(faUser, faHome, faSignOutAlt, faCartShopping)

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Register the FontAwesome component globally
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
