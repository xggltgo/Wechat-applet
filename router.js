// router.js
import {
	RouterMount,
	createRouter
} from 'uni-simple-router';
import store from './store/index.js';

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,
	routes: [...ROUTES]
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	if (to.meta.auth && !store.state.userInfo.userInfo) {
		next({
			name:'login',
			NAVTYPE: "push"  //跳转到普通页面，新开保留历史记录
		})
	} else {
		next();
	}
});


export {
	router,
	RouterMount
}
