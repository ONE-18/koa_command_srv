import { createApp } from 'vue'
import App from './App.vue'

// createApp(App).mount('#app')

const app = createApp(App)

// app.use(corsMiddleware(config.CORS_SYSTEMAPI_ALLOWED_ORIGINS, config.CORS_SYSTEMAPI_EXCLUDED_ENDPOINTS));

app.mount('#app')
