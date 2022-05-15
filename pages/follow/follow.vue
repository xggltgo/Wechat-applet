<template>
	<view class="follow-page-container">
		<view class="follow-page-header">
			<view class="follow-type">
				<view class="follow-type-item" :class="currentIndex===0?'active':''" @click="currentIndex=0">
					文章
				</view>
				<view class="follow-type-item" :class="currentIndex===1?'active':''" @click="currentIndex=1">
					作者
				</view>
			</view>
		</view>

		<view class="follow-page-content">
			<swiper class="swiper-container" :current="currentIndex" @change="currentIndex=$event.detail.current">
				<swiper-item>
					<ArticleList :articleList="articleList" :isSearchPage="false" v-if="articleList.length">
					</ArticleList>
					<NoData :text="text" v-else bgColor="#fff"></NoData>
				</swiper-item>
				<swiper-item>
					<view class="follow-author-item" v-for="item in authorList" :key="item._id">
						<view class="image">
							<image :src="item.avatar" mode="aspectFill"></image>
						</view>
						<view class="follow-author-info">
							<view class="name">
								{{item.author_name}}
							</view>
							<view class="desc">
								<view class="job">
									{{item.professional}}
								</view>
								<view class="info">
									<text>发帖 {{item.article_ids.length}}</text>
									<text class="fans">粉丝 {{item.fans_count}}</text>
								</view>
							</view>
						</view>
					</view>
					<NoData text="您还没有关注作者" bgColor="#fff" v-if="!authorList.length"></NoData>
				</swiper-item>
			</swiper>
		</view>

	</view>
</template>

<script>
	export default {
		onLoad() {
			if(!this.userInfo){
				return;
			}
			uni.$on('clickSaveLike',()=>{
				this._getSaveLikeArticle('no-loading');
			})
			uni.$on('clickThumbsUp',()=>{
				this._getFollowAuthor('no-loading')
			})
			this._getSaveLikeArticle()
			this._getFollowAuthor()
		},
		onShow() {
			// #ifndef H5
			if (!this.userInfo) {
				uni.redirectTo({
					url: '/pages/userInfo/login/login'
				})
				return;
			}
			// #endif
		},
		data() {
			return {
				currentIndex: 0,
				articleList: [],
				authorList:[],
				text:'loading...'
			}
		},
		methods: {
			async _getSaveLikeArticle(isLoading){
				const res = await this.$http.getSaveLikeArticle({
					userId:this.userInfo && this.userInfo._id,
					isLoading
				})
				this.articleList = res;
				this.text='您还没有收藏文章';
			},
			async _getFollowAuthor(isLoading){
				const res = await this.$http.getFollowAuthor({
					userId:this.userInfo && this.userInfo._id,
					isLoading
				})
				this.authorList = res;
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: $bg;
		height: 100%;
	}

	.follow-page-container {
		@include flex(flex-start, column);
		height: 100%;
		/* #ifndef H5 */
		height: 100vh;
		background: $bg;
		/* #endif */
		.follow-page-header {
			height: 100rpx;
			padding: 0 40rpx;
			box-sizing: border-box;
			border-bottom: 2rpx solid #ddd;
			width: 100%;
			@include flex();

			.follow-type {
				width: 100%;
				display: flex;
				height: 60rpx;
				border-radius: 10rpx;
				border: 2rpx solid $base-color;
				box-sizing: border-box;

				.follow-type-item {
					@include flex(center);
					flex-grow: 1;
					font-size: 28rpx;
					transition: all 0.3s;

					&.active {
						background: $base-color;
						color: #fff;
					}

					&:first-child {
						border-right: 2rpx solid $base-color;
					}
				}
			}
		}

		.follow-page-content {
			flex-grow: 1;
			width: 100%;

			.swiper-container {
				height: 100%;
			}
		}
	}
	
	.follow-author-item{
		@include flex(flex-start);
		padding: 20rpx 0;
		box-sizing: border-box;
		align-items: flex-start;
		margin: 0 20rpx;
		border-bottom: 2rpx solid #ddd;
		.image{
			flex-shrink: 0;
			width: 90rpx;
			height: 90rpx;
			overflow: hidden;
			margin-right: 20rpx;
			image{
				height: 100%;
				width: 100%;
			}
		}
		.follow-author-info{
			flex-grow: 1;
			@include flex(flex-end,column);
			align-items: flex-start;
			font-size: 28rpx;
			.name{
				font-weight: bold;
				margin-bottom: 20rpx;
			}
			.desc{
				@include flex();
				font-size: 24rpx;
				color: #666;
				width: 100%;
				.fans{
					margin-left: 20rpx;
				}
			}
		}
	}
	
</style>
