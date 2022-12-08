import { createApp } from 'vue'
import App from './App.vue'
import {createVuestic} from 'vuestic-ui';
import 'vuestic-ui/css'
import './assets/style.scss'
import {createPinia} from 'pinia';

createApp(App).use(createPinia()).use(createVuestic()).mount('#app')
