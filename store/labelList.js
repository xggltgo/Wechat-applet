export default {
	namespaced:true,
	state:{
		labelList:uni.getStorageSync('labelListInfo') || [],
	},
	mutations:{
		initLabelList(state,payload){
			state.labelList = payload;
			uni.setStorageSync('labelListInfo',payload)
		}
	}
}