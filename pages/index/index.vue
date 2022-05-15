<template>
	<view class="home-container">
		<NavBar></NavBar>
		<TabBar :currentIndex="currentIndex" :labelList="labelList" @activeChange="handleActiveChange"></TabBar>
		<ArticleType :currentIndex="currentIndex" :labelList="labelList" @activeChange="handleActiveChange">
		</ArticleType>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		name: 'Index',
		onLoad() {
			this._getLabelList()
		},
		data() {
			return {
				currentIndex: 0,
			}
		},
		computed: {
			// ...mapState('labelList',['labelList'])
			labelList() {
				if (this.userInfo) {
					this.currentIndex = 0;
					return this.$store.state.labelList.labelList.filter(item => this.userInfo.person_label_ids.includes(
						item._id) || (item.name === '全部'))
				} else {
					return this.$store.state.labelList.labelList
				}
			}
		},
		methods: {
			async _getLabelList() {
				if(this.labelList.length){
					return
				}
				const res = await this.$http.getLabelList()
				this.initLabelList([{
					name: "全部",
					_id: -1
				}, ...res]);
			},
			handleActiveChange(index) {
				this.currentIndex = index;
			},
			...mapMutations('labelList', ['initLabelList'])
		},
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
	}

	.home-container {
		@include flex(flex-start, column);
		align-items: flex-start;
		height: 100%;
		
		/* #ifndef H5 */
		height: 100vh;
		width: 100vw;
		
		nav-bar {
			width: 100%;
		}
		
		tab-bar {
			width: 100%;
		}
		
		article-type {
			width: 100%;
			flex-grow: 1;
		}
		/* #endif */

		.article-type-container {
			flex-grow: 1;
		}
	}
</style>
