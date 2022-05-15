import Vue from 'vue';
import VueX from 'vuex';
import userInfo from './userInfo.js';
import historicalRecords from './historicalRecords.js';
import labelList from './labelList.js';
Vue.use(VueX)

const store = new VueX.Store({
	modules: {
		userInfo,
		historicalRecords,
		labelList,
	}
})

export default store;
