import Vue from 'vue';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

import '../styles/reset.css';
import App from '../components/App.vue';

import '../styles/layout.css';
import '../styles/tables.css';
import '../styles/mobile.css';

/* eslint-disable-next-line no-new */
new Vue({ el: '#app', render: r => r(App) });

if ('serviceWorker' in navigator) {
  runtime.register();
}
