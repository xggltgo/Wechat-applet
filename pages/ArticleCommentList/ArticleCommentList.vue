<template>
	<view class="article-comment-list">
		<!-- <CommentBox :commentInfo></CommentBox> -->
		<!-- 评论信息展示区域 -->


		<view class="comment-list-area">
			<view class="comment-box" v-for="item in commentList" :key="item.comment_id">
				<CommentBox :commentInfo="item" @replyComment="handleReplyComment"></CommentBox>
			</view>
		</view>
		<uni-load-more :status="loading" v-if="commentList.length>5||(commentList.length===0)" :contentText="{contentdown: '上拉显示更多',
						contentrefresh: '正在加载...',
						contentnomore: '没有更多评论了'}"></uni-load-more>


		<CommentMask :isShow="isShowCommentMask" @cancelComment="isShowCommentMask=$event"
			@publishComment="handlePublishComment"></CommentMask>
	</view>
</template>

<script>
	export default {
		name: 'ArticleCommentList',
		onLoad(options) {
			this.articleId = options.articleId
			this._getArticleComment();
		},
		async onReachBottom() {
			if (this.loading === 'noMore' || this.isLoadingMore) {
				return;
			}
			this.page++;
			this.isLoadingMore = true;
			await this._getArticleComment();
			this.isLoadingMore = false;
		},
		data() {
			return {
				articleId: '',
				commentList: [],
				isShowCommentMask: false,
				replyCommentInfo: {},
				page: 1,
				limit: 5,
				loading: 'loading',
				isLoadingMore: false,
			}
		},
		methods: {
			async _getArticleComment() {
				const data = await this.$http.getArticleComment({
					articleId: this.articleId,
					page: this.page,
					limit: this.limit,
				})
				if (data.length < this.limit) {
					this.loading = 'noMore'
				}
				// this.commentList = data;
				this.commentList.push(...data)
				if (!data.length && this.commentList.length) {
					this.page--;
				}
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
					articleId: this.articleId,
					commentContent,
					...this.replyCommentInfo
				})
				uni.showToast({
					title: msg
				})
				this.isShowCommentMask = false;
				this.replyCommentInfo = {};
				this.commentList = [];
				this.page=1;
				this.loading='loading'
				this._getArticleComment();
				
			},
		}
	}
</script>

<style lang="scss" scoped>
	.article-comment-list {
		padding: 0 30rpx;
		box-sizing: border-box;

		.comment-box {
			box-sizing: border-box;
			border-bottom: 2rpx solid #ddd;
		}
	}
</style>
