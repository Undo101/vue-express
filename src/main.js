import Vue from 'vue'
import App from './App'
new Vue({
    created () {
        console.log('启动成功')
    },
    render: h => h(App)
}).$mount('#app')