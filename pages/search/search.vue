<template>
	<view class="search-container">
		<NavBar @confirmSearch="_handleConfirmSearch" @updateSearchText="handleUpdateSearchText"
			:oldSearchText="oldSearchText" :isSearchPage="isSearchPage"></NavBar>
		<!-- 搜索展示区域 -->
		<!-- 搜索历史区域 -->
		<view class="search-history-container" v-if="!isSearching">
			<view class="header">
				<text style="color: #FF6370;">搜索历史</text>
				<text style="color: #18BC37;font-weight: bold;" @click="clearAllHistory">清空</text>
			</view>
			<view class="history-records">
				<!-- 有历史记录的情况 -->
				<view class="has-history-records" v-if="historicalRecordsInfo.length">
					<text @click="handleClickHistoryRecords(item)" class="history-records-item" v-for="item in historicalRecordsInfo" :key="item">
						{{item}}
					</text>
				</view>
				<!-- 没有历史记录的情况 -->
				<view class="no-data" v-else>
					<text>当前没有搜索历史</text>
				</view>
			</view>
		</view>
		<!-- 搜索内容展示 -->
		<view class="search-content-container" v-else>
			<view class="has-data" v-if="searchedArticleList.length">
				<ArticleList @canSaveHistory="handleCanSaveHistory" :isSearchPage="!isSearchPage"
					:articleList="searchedArticleList"></ArticleList>
			</view>
			<view class="no-data" v-else>
				没有搜索到相关数据
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from 'vuex';
	export default {
		name: 'Search',
		data() {
			return {
				isSearchPage: true,
				isSearching: false,
				oldSearchText: '',
				searchedArticleList: [],
			}
		},
		computed: {
			...mapState('historicalRecords', ['historicalRecordsInfo'])
		},
		methods: {
			async _handleConfirmSearch() {
				if(!this.oldSearchText){
					return;
				}
				//处理用户搜索
				this.searchedArticleList = await this.$http.searchArticleList({
					searchKeyword: this.oldSearchText
				})
				this.isSearching = true;
			},
			handleCanSaveHistory() {
				this.initHistoricalRecordsInfo(this.oldSearchText)
			},
			...mapMutations('historicalRecords', ['initHistoricalRecordsInfo','clearAllHistoricalRecords']),
			handleUpdateSearchText(searchText) {
				if(!searchText){
					this.isSearching = false;
				}
				this.oldSearchText = searchText;
			},
			clearAllHistory(){
				this.clearAllHistoricalRecords();
			},
			handleClickHistoryRecords(searchText){
				this.oldSearchText = searchText;
				this._handleConfirmSearch();
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #f5f5f5;
	}

	.search-container {
		display: flex;
		flex-direction: column;
		height: 100vh;
		overflow: hidden;
		background: #f5f5f5;

		.search-history-container {
			background: #FFF;


			.header {
				@include flex();
				font-size: 28rpx;
				padding: 20rpx 30rpx;
				box-sizing: border-box;
				border-bottom: 2rpx solid #F5F5F5;
			}

			.has-history-records {
				padding: 20rpx 30rpx;
				box-sizing: border-box;
				@include flex(flex-start, row, wrap);

				.history-records-item {
					padding: 10rpx 20rpx;
					border: 1rpx solid $base-color;
					border-radius: 20rpx;
					margin-right: 10rpx;
					margin-bottom: 10rpx;
					font-size: 24rpx;
					color: $base-color;
					box-sizing: border-box;
				}
			}


		}

		.search-content-container {
			flex-grow: 1;
			overflow: hidden auto;
			height: 100%;
		}


	}

	.no-data {
		height: 400rpx;
		@include flex(center);
		font-size: 24rpx;
		color: $c-9;
	}
</style>
