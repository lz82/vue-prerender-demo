import Vue from 'vue'

import App from './app'

import router from './router'

const app = new Vue({
  el: '#app',
  router,
  render: h => h(App),
  mounted () {
    document.dispatchEvent(new Event('render-event'))
  }
})

app.$mount('#app')
