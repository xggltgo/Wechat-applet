export default {
	namespaced: true,
	state: {
		userInfo: uni.getStorageSync('userInfo') || null,
	},
	mutations: {
		initUserInfo(state, payload) {
			uni.setStorageSync('userInfo',payload);
			state.userInfo = payload;
		}
	}
}
