import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './route/routes'
import Message from './components/Message.vue'

const app = createApp(App)


app.use(router)
.mount('#app')
