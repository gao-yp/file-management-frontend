import { createApp } from 'vue'
import store from './store'


import Vant, { Lazyload } from 'vant';
import 'vant/lib/index.css';
import '@vant/touch-emulator';


import router from "./router";

import Vue3Marquee from 'vue3-marquee'


// import './style.css'
import App from './App.vue'

const app = createApp(App);
app.use(store)
app.use(Vant);
app.use(Lazyload);
app.use(router);
app.use(Vue3Marquee);


app.mount('#app');
