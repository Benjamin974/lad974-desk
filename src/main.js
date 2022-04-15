import Vue from 'vue'
import Vuetify from 'vuetify';
import router from './routes';
import 'vuetify/dist/vuetify.min.css';
import Layout from './layouts/Layout.vue';

Vue.config.productionTip = false
Vue.use(Vuetify);

const app = new Vue({
    el: '#app',
    vuetify: new Vuetify({}),
    router: router,
    render: h => h(Layout)
})

export default new Vuetify(app);
