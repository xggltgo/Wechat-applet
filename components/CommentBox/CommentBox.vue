<template>
	<view class="comment-box-container">
		<view class="comment-header">
			<view class="avatar">
				<image :src="commentInfo.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="name-time">
				<view class="name" v-if="!commentInfo.is_reply">
					{{commentInfo.author.author_name}}
				</view>
				<view class="name" v-else>
					{{commentInfo.author.author_name}}
					<text>回复</text>
					{{commentInfo.to}}
				</view>
				<view class="time">
					<uni-dateformat :date="commentInfo.comment_time" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat>
				</view>
			</view>
		</view>
		<view class="comment-content">
			<view class="text">
				{{commentInfo.comment_content}}
			</view>
			<view class="reply">
				<text @click="replyComment({comment:commentInfo,isReply})">回复</text>
			</view>
			<!-- 回复评论区域 -->
			<view class="reply-comment-area" v-for="item in commentInfo.replyArr" :key="item.comment_id">
				<CommentBox :isReply="true" :commentInfo="item" :hasBorderTop="false" @replyComment="replyComment"></CommentBox>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"CommentBox",
		props:{
			commentInfo:{
				type:Object,
				required:true
			},
			isReply:{
				type:Boolean,
				default:false
			}
		},
		methods: {
			replyComment(data) {
				if(data.isReply){
					data.comment.reply_id=data.comment.comment_id;
					data.comment.comment_id=this.commentInfo.comment_id;
				}
				this.$emit('replyComment',data)
			}
		},
	}
</script>

<style lang="scss" scoped>
.comment-box-container{
	padding: 30rpx 0;
	box-sizing: border-box;
	.comment-header{
		@include flex(flex-start);
		align-items: flex-start;
		.avatar{
			flex-shrink: 0;
			width: 80rpx;
			height: 80rpx;
			border-radius: 10rpx;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.name-time{
			@include flex(flex-start,column);
			margin-left: 30rpx;
			font-size: 24rpx;
			line-height: 1;
			color: $c-9;
			align-items: flex-start;
			.name{
				font-size: 28rpx;
				color: #333;
				margin-bottom: 30rpx;
				text{
					font-weight: bold;
					margin: 0 20rpx;
					color: #000;
				}
			}
		}
	}
	.comment-content{
		font-size: 28rpx;
		color: #333333;
		margin-top: 20rpx;
		.reply{
			@include flex(flex-start);
			margin-top: 20rpx;
			text{
				padding: 4rpx 20rpx;
				box-sizing: border-box;
				color: #999;
				border-radius: 40rpx;
				border: 2rpx solid $c-9;
				font-size: 24rpx;
			}
		}
	}
}

.reply-comment-area{
	border-top: none;
	padding-left: 40rpx;
	border-bottom: 2rpx dashed $base-color;
	transform: scale(.9);
	box-sizing: border-box;
}



</style>
