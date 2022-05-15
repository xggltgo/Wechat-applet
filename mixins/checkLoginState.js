import {
	mapState,mapMutations
} from "vuex"

export default {
	install(Vue) {
		Vue.mixin({
			computed: {
				...mapState('userInfo', ['userInfo']) //检测用户是否登录,并获取到用户信息(统一处理)
			},
			methods: {
				whoAmI() {
					//检测用户是否登录 
					return new Promise((resolve, reject) => {
						if (this.userInfo) {
							//已经登录 可继续执行后续操作
							resolve();
						} else {
							//未登录 导航到登录页
							uni.navigateTo({
								url: '/pages/userInfo/login/login'
							})
						}
					})
				},
				...mapMutations('userInfo', ['initUserInfo']), //更新用户信息(统一处理)
			},
		})
	}
}
