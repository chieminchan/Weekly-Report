import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMoment from 'vue-moment';
import moment from 'moment'
import ElementUI from 'element-ui';

import './css/index.less';
import 'font-awesome/css/font-awesome.css';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.use(VueMoment, {
    moment
});
Vue.config.productionTip = process.env.NODE_ENV === 'production';

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')