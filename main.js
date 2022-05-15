import App from './App'
import module from './ajax/api/index.js'
import formRulesMixin from './mixins/formRules.js'
import store from './store/index.js'
import checkLoginStateMixin from './mixins/checkLoginState.js'

// #ifndef VUE3
import Vue from 'vue'
import {
	router,
	RouterMount
} from './router.js'
Vue.use(router)
Vue.config.productionTip = false
Vue.prototype.$http = module
Vue.use(formRulesMixin)
Vue.use(checkLoginStateMixin)
App.mpType = 'app'
const app = new Vue({
	store,
	...App
})
// #ifdef H5
RouterMount(app, router, '#app')
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
