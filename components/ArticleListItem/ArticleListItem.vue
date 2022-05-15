<template>
	<view class="article-list-item-container" @click="linkToArticleDetail">
		<!-- mode==='column'(三张中图) -->
		<view class="column-container" v-if="articleInfo.mode==='column'">
			<view class="top">
				<text class="content">{{articleInfo.title}}</text>
				<SaveLike :articleId="articleInfo._id"></SaveLike>
			</view>
			<view class="center">
				<view class="image-container" v-for="(imageItem,index) in articleInfo.cover.slice(0,3)" :key="index">
					<image :src="imageItem" mode="aspectFill">
					</image>
				</view>
			</view>
			<view class="bottom">
				<text class="articleType">
					{{articleInfo.classify}}
				</text>
				<text class="scanNumber">
					{{articleInfo.browse_count}}浏览
				</text>
			</view>
		</view>

		<!-- mode==='base'(一张小图) -->
		<view class="base-container" v-else-if="articleInfo.mode==='base'">
			<view class="image-container">
				<image :src="articleInfo.cover[0]?articleInfo.cover[0]:'/static/img/es.png'">
				</image>
			</view>
			<view class="right">
				<view class="top">
					<text class="content">
						{{articleInfo.title}}
					</text>
					<SaveLike :articleId="articleInfo._id"></SaveLike>
				</view>
				<view class="bottom">
					<text class="articleType">
						{{articleInfo.classify}}
					</text>
					<text class="scanNumber">
						{{articleInfo.browse_count}}浏览
					</text>
				</view>
			</view>
		</view>

		<!-- mode==='image'(一张大图) -->
		<view class="image-out-container" v-else-if="articleInfo.mode==='image'">
			<view class="image-container">
				<image :src="articleInfo.cover[0]" mode="aspectFill">
				</image>
			</view>
			<view class="top">
				<text class="content">{{articleInfo.title}}</text>
				<SaveLike :articleId="articleInfo._id"></SaveLike>
			</view>
			<view class="bottom">
				<text class="articleType">
					{{articleInfo.classify}}
				</text>
				<text class="scanNumber">
					{{articleInfo.browse_count}}浏览
				</text>
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		name: "ArticleListItem",
		props: {
			articleInfo: {
				type: Object,
				required: true,
			}
		},
		data() {
			return {

			};
		},
		methods: {
			linkToArticleDetail() {
				const {_id,title,create_time,thumbs_up_count,browse_count,author}=this.articleInfo;
				const params = {_id,title,create_time,thumbs_up_count,browse_count,author};
				this.$emit('canSaveHistory');
				// uni.navigateTo({
				// 	url:`/pages/articleDetail/articleDetail?params=${JSON.stringify(params)}`,
				// })
				this.$Router.push({
					path:'/pages/articleDetail/articleDetail',
					query:{
						...params
					}
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	// 顶部样式
	.top {
		@include flex();
		align-items: flex-start;

		.content {
			font-size: 28rpx;
			color: #333;
			line-height: 1.2;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
	}

	//底部样式
	.bottom {
		@include flex(space-between);
		margin-top: 20rpx;
		font-size: 24rpx;

		.scanNumber {
			color: $c-9;
		}

		.articleType {
			padding: 0 10rpx;
			border-radius: 30rpx;
			color: $base-color;
			border: 2rpx solid $base-color;
			display: inline-block;
		}
	}

	//图片撑满父容器
	image {
		height: 100%;
		width: 100%;
	}

	//图片容器公共处理
	.image-container {
		border-radius: 10rpx;
		overflow: hidden;
		flex: 0 0 auto;
	}

	.article-list-item-container {
		background: #FFF;
		border-radius: 10rpx;
		padding: 20rpx;
		margin: 20rpx;
		box-sizing: border-box;
		box-shadow: 0 0 20rpx 2rpx rgba(0, 0, 0, 0.1);

		// mode==='column'(三张中图)
		.column-container {
			.center {
				@include flex();
				margin: 20rpx 0;
				margin-bottom: 40rpx;

				.image-container {
					width: 32%;
					height: 140rpx;
				}
			}
		}

		//mode==='base'(一张小图)
		.base-container {
			@include flex(flex-start);

			.image-container {
				width: 120rpx;
				height: 120rpx;
				margin-right: 20rpx;
			}

			.right {
				flex-grow: 1;
			}
		}

		//mode==='image'(一张大图)
		.image-out-container {
			.image-container {
				height: 200rpx;
				width: 100%;
				margin-bottom: 15rpx;
			}
		}

	}

	//收藏图标处理
	.save-like-container {
		color: $base-color;
	}
	/* #ifdef MP-WEIXIN */
	save-like{
		color: $base-color;
	}
	/* #endif */
</style>
