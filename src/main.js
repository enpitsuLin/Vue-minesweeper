import Vue from 'vue'
import Orzmine from "./vue-mine.vue";
import 'font-awesome/css/font-awesome.css'

Vue.config.productionTip = false

new Vue({
    render: h => h(Orzmine),
}).$mount('#app')
