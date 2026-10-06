import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@fortawesome/fontawesome-free/css/all.css';
// Froth Modern theme design system (only active when data-theme="froth")
import '@/assets/froth.css';

createApp(App).use(store).use(router).mount('#app')
