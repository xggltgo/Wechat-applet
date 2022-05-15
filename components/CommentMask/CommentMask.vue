<template>
	<view class="comment-mask-container">
		<uni-popup ref="popup" type="bottom" :mask-click="false">
			<view class="popup-container">
				<view class="pop-header">
					<text class="cancel" @click="cancelComment">取消</text>
					<text class="publish" @click="publishComment">发布</text>
				</view>
				<view class="pop-content">
					<textarea v-model.trim="commentContent" maxlength="200" placeholder="请输入评论内容" />
					<view class="tips">
						{{commentContent.length}}/200
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name:"CommentMask",
		props:{
			isShow:{
				type:Boolean,
				required:true,
			}
		},
		data() {
			return {
				commentContent:'',
			};
		},
		methods: {
			cancelComment() {
				this.$emit('cancelComment',false)
			},
			publishComment(){
				if(!this.commentContent){
					uni.showToast({
						title:'请先输入评论内容',
						icon:'none'
					})
					return;
				}
				this.$emit('publishComment',this.commentContent);
				this.commentContent='';
			}
		},
		watch:{
			isShow(newVal){
				newVal?this.$refs.popup.open():this.$refs.popup.close()
			}
		}
	}
</script>

<style lang="scss" scoped>
.popup-container{
	background: #fff;
	.pop-header{
		@include flex();
		font-size: 28rpx;
		border: 2rpx solid $bg;
		text{
			height: 100rpx;
			line-height: 100rpx;
			padding: 0 30rpx;
			box-sizing: border-box;
			font-weight: bold;
			&.publish{
				color: $base-color;
			}
			&.cancel{
				color: #22c301;
			}
		}
	}
	.pop-content{
		width: 100%;
		padding: 30rpx;
		box-sizing: border-box;
		textarea{
			height: 400rpx;
			width: 100%;
			font-size: 28rpx;
		}
		.tips{
			@include flex(flex-end);
			font-size: 24rpx;
			color: #999;
		}
	}
}
</style>
