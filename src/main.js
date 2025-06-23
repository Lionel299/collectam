import { createApp } from 'vue'


import App from './App.vue'
import router from './router';



const app = createApp(App);
app.use(router); // Utilisez le routeur
app.mount('#app');