/*
import { createApp } from 'vue';
import App from './App.vue';

import './assets/scss/style.scss';

createApp(App).mount('#app');
*/
import { defineCustomElement } from 'vue';
import App from './App.ce.vue';

const element = defineCustomElement(App);
customElements.define('weather-widget', element);