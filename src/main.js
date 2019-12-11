// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './libs/metaUpdater'
import './libs/scrollTopOnChange'
import './plugins/es6-promise'
import './plugins/vuex'
import './plugins/axios'
import './plugins/font-awesome'
import './plugins/pace-js/loader'
import './plugins/vuejs-paginate'
import './plugins/vue-floatthead'
import './plugins/vue-tippy'
import './plugins/hover.css'
import './plugins/vue-slider-component'
import './plugins/hotjar'
import './plugins/buefy'
import './plugins/vue-multiselect'
import Pace from 'pace-js/pace.min'
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

Vue.config.productionTip = false

// Show loader when loading lazy load components
router.beforeEach((to, from, next) => {
  Pace.start()
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
