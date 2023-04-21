import './bootstrap';
import {createApp} from 'vue/dist/vue.esm-bundler.js'
import ArticleLike from './components/ArticleLike.vue'

createApp({
    components:{
        ArticleLike,
    }
}).mount('#app');
