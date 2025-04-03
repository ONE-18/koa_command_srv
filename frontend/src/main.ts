import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


const app = createApp(App);

import { VueUmamiPlugin } from '@jaseeey/vue-umami-plugin';
const umamiPlugin = VueUmamiPlugin({
    websiteID: 'e149e4ec-a701-4c97-803e-93d3a68df9cb',
    scriptSrc: 'http://localhost:3000/script.js',
    router,
    allowLocalhost: true,
});
app.use(umamiPlugin);


app.use(createPinia())
app.use(router)

app.mount('#app')
