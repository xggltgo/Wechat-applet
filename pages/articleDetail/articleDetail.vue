<template>
	<view class="article-detail-container" v-if="articleInfo">
		<view class="article-detail-header">
			<view class="article-title">
				{{ articleInfo.title }}
			</view>
			<view class="article-info">
				<view class="avatar">
					<image :src="articleInfo.author.avatar" mode="aspectFill"></image>
				</view>
				<view class="info">
					<view class="author">
						{{ articleInfo.author.author_name }}
					</view>
					<view class="nums">
						<text>{{ articleInfo.create_time }}</text>
						<text>{{ articleInfo.browse_count }} 浏览</text>
						<text>{{ articleInfo.thumbs_up_count }} 赞</text>
					</view>
				</view>
				<button type="default" class="follow"
					@click="handleFollowAuthor">{{isFollowAuthor?'取消关注':'关注'}}</button>
			</view>
		</view>
		<view class="article-detail-content">
			<u-parse v-if="content" className="markdown-body" :content="content"></u-parse>
			<view class="seat" v-else>
				loading...
			</view>
		</view>


		<!-- 评论信息展示区域 -->
		<view class="commentInfo" v-if="content">
			<view class="title">
				最新评论
			</view>

			<view class="comment-box" v-for="item in commentList" :key="item.comment_id">
				<CommentBox :commentInfo="item" @replyComment="handleReplyComment"></CommentBox>
			</view>
			<NoData v-if="commentList&&!commentList.length" text="暂无评论数据" :containerHeight="300"></NoData>
		</view>

		<!-- 用户操作区域 -->
		<view class="article-detail-operation">
			<view class="comment-area" @click="handleComment">
				<text>谈谈你的看法</text>
				<view class="icon">
					<uni-icons type="compose" size="18" color="#ff6370"></uni-icons>
				</view>
			</view>
			<view class="icon-area">
				<view class="icon" @click="linkToCommentList">
					<uni-icons type="chat" size="24" color="#ff6370"></uni-icons>
				</view>
				<view class="icon" style="vertical-align: -3rpx;">
					<SaveLike :size="22" :articleId="articleInfo._id"></SaveLike>
				</view>
				<view class="icon" @click="handleThumbsUp">
					<uni-icons :type="isThumbsUp?'hand-up-filled':'hand-up'" size="24" color="#ff6370"></uni-icons>
				</view>
			</view>
		</view>
		<!-- 评论弹出层组件 -->
		<CommentMask :isShow="isShowCommentMask" @cancelComment="isShowCommentMask=$event"
			@publishComment="handlePublishComment"></CommentMask>
	</view>
</template>

<script>
	import marked from 'marked';
	import uParse from '@/components/u-parse/u-parse.vue';
	// import MDParserHighlight from '@/components/cmder-MDParserHighlight/index.vue'
	export default {
		name: 'articleDetail',
		components: {
			uParse,
			// MDParserHighlight
		},
		onLoad(options) {
			let params = this.$Router.currentRoute.query;
			this.articleInfo = params;

			this._getArticleDetail();
			this._getArticleComment();
		},
		data() {
			return {
				articleInfo: null,
				isShowCommentMask: false,
				commentList: [],
				replyCommentInfo: {}
			};
		},
		computed: {
			content() {
				try {
					return marked(this.articleInfo.content);
				} catch (error) {
					return null;
				}
			},
			isFollowAuthor() {
				return this.userInfo && this.userInfo.author_likes_ids.includes(this.articleInfo && this.articleInfo.author
					.id)
			},
			isThumbsUp() {
				return this.userInfo && this.userInfo.thumbs_up_article_ids.includes(this.articleInfo && this.articleInfo
					._id)
			}
		},
		methods: {
			async _getArticleDetail() {
				const data = await this.$http.getArticleDetail({
					articleId: this.articleInfo._id,
				});
				this.articleInfo = data[0];
			},
			async _getArticleComment() {
				const data = await this.$http.getArticleComment({
					articleId: this.articleInfo._id,
				})
				if (!data) {
					return;
				}
				this.commentList = data;
			},
			async handleComment() {
				await this.whoAmI();
				this.replyCommentInfo = {};
				this.isShowCommentMask = true;
			},
			async handlePublishComment(commentContent) {

				const {
					msg
				} = await this.$http.publishComment({
					userId: this.userInfo._id,
					articleId: this.articleInfo._id,
					commentContent,
					...this.replyCommentInfo
				})
				uni.showToast({
					title: msg
				})
				this.isShowCommentMask = false;
				this.replyCommentInfo = {};
				this._getArticleComment();
			},
			async handleReplyComment(originalComment) {
				await this.handleComment();
				// const {comment_id} = originalComment;
				this.replyCommentInfo = {
					beRepliedCommentId: originalComment.comment.comment_id,
					is_reply: originalComment.isReply
				}
				originalComment.comment.reply_id && (this.replyCommentInfo.reply_id = originalComment.comment.reply_id)
			},
			//关注作者功能模块
			async handleFollowAuthor() {
				await this.whoAmI();
				const {
					msg
				} = await this.$http.updateFollowAuthor({
					userId: this.userInfo._id,
					authorId: this.articleInfo.author.id
				})
				uni.showToast({
					title: msg,
				})
				//更新本地数据
				if (this.userInfo.author_likes_ids.includes(this.articleInfo.author.id)) {
					//移除
					const newVal = this.userInfo.author_likes_ids.filter(item => item !== this.articleInfo.author.id);
					this.initUserInfo({
						...this.userInfo,
						author_likes_ids: newVal
					});
				} else {
					//新增
					const newVal = [...this.userInfo.author_likes_ids, this.articleInfo.author.id];
					this.initUserInfo({
						...this.userInfo,
						author_likes_ids: newVal
					});
				}
				uni.$emit('clickThumbsUp');
			},
			//点赞文章功能
			async handleThumbsUp() {
				await this.whoAmI();
				const {
					msg
				} = await this.$http.updateThumbsUp({
					userId: this.userInfo._id,
					articleId: this.articleInfo._id
				});
				uni.showToast({
					title: msg,
				});
				//更新本地数据
				if (this.userInfo.thumbs_up_article_ids.includes(this.articleInfo._id)) {
					//移除
					const newVal = this.userInfo.thumbs_up_article_ids.filter(item => item !== this.articleInfo._id);
					this.initUserInfo({
						...this.userInfo,
						thumbs_up_article_ids: newVal
					});
				} else {
					//新增
					const newVal = [...this.userInfo.thumbs_up_article_ids, this.articleInfo._id];
					this.initUserInfo({
						...this.userInfo,
						thumbs_up_article_ids: newVal
					});
				}
			},
			//跳转到评论列表界面
			linkToCommentList() {
				uni.navigateTo({
					url: `/pages/ArticleCommentList/ArticleCommentList?articleId=${this.articleInfo._id}`
				})
			}

		},
	};
</script>

<style lang="scss" scoped>
	@import url('@/components/u-parse/u-parse.css');

	.article-detail-container {
		padding: 30rpx 30rpx 108rpx;
		box-sizing: border-box;

		.article-detail-header {
			margin-bottom: 60rpx;

			.article-title {
				font-size: 40rpx;
				font-weight: bold;
				box-sizing: border-box;
				color: #333;
				margin-bottom: 20rpx;
			}

			.article-info {
				@include flex(flex-start);

				.avatar {
					flex-shrink: 0;
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					overflow: hidden;
					margin-right: 30rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.info {
					flex-grow: 1;

					.author {
						font-size: 28rpx;
						font-weight: bold;
						color: #333;
						margin-bottom: 5rpx;
					}

					.nums {
						color: $c-9;
						font-size: 24rpx;
						@include flex(flex-start);

						text {
							margin-right: 10rpx;
						}
					}
				}

				.follow {
					flex-shrink: 0;
					height: 60rpx;
					line-height: 60rpx;
					border-radius: 10rpx;
					background: $base-color;
					color: #ffffff;
					font-size: 24rpx;
					padding: 0 20rpx;
					box-sizing: border-box;
				}
			}
		}


		.article-detail-content {
			width: 100%;

			.seat {
				font-size: 26rpx;
				color: $c-9;
				@include flex(center);
			}
		}

		.article-detail-operation {
			@include flex(flex-start);
			position: fixed;
			bottom: 0;
			left: 0;
			height: 88rpx;
			border-top: 2rpx solid $bg;
			background: #fff;
			width: 100%;
			box-sizing: border-box;
			padding-left: 30rpx;

			.comment-area {
				@include flex();
				border-radius: 10rpx;
				border: 2rpx solid #ddd;
				height: 60rpx;
				flex-grow: 1;
				padding: 0 20rpx;
				box-sizing: border-box;

				text {
					font-size: 28rpx;
					color: $c-9;
				}
			}

			.icon-area {
				@include flex();
				align-items: flex-end;

				.icon {
					@include flex(center);
					width: 88rpx;
					color: $base-color;
				}
			}
		}
	}

	.commentInfo {
		margin-top: 60rpx;

		.title {
			padding: 20rpx 0;
			border-bottom: 2rpx solid #ddd;
			box-sizing: border-box;
			font-size: 28rpx;
			color: #666;
		}
	}

	.comment-box {
		border-bottom: 2rpx solid #ddd;
		box-sizing: border-box;
	}
</style>
