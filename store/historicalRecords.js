export default {
	namespaced: true,
	state: {
		historicalRecordsInfo: uni.getStorageSync('historicalRecordsInfo') || [],
	},
	mutations:{
		initHistoricalRecordsInfo(state,payload){
			//判断历史记录数组中是否已经存在该条历史记录
			if(state.historicalRecordsInfo.includes(payload)){
				return;
			}
			state.historicalRecordsInfo.unshift(payload);
			uni.setStorageSync('historicalRecordsInfo',state.historicalRecordsInfo);
		},
		clearAllHistoricalRecords(state,payload){
			uni.removeStorageSync('historicalRecordsInfo');
			state.historicalRecordsInfo=[];
		}
	}
}
