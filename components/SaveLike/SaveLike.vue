<template>
	<view class="save-like-container" @click.stop="saveLike">
		<uni-icons :type="isSavelike?'heart-filled':'heart'" :size="size" color="inherit"></uni-icons>
	</view>
</template>

<script>
	export default {
		name: "SaveLike",
		props: {
			articleId: {
				type: String,
			},
			size:{
				type:Number,
				default:20,
			}
		},
		computed:{
			isSavelike(){
				return this.userInfo && this.userInfo.article_likes_ids.includes(this.articleId);
			}
		},
		methods: {
			async saveLike() {
				//检测登录状态
				await this.whoAmI();
				//若已登录 需要更新收藏状态
				const {msg,updatedUserInfo} = await this.$http.updateSaveLikeInfo({
					userId: this.userInfo._id,
					articleId: this.articleId
				})
				//弹出后端返回的提示信息
				uni.showToast({
					title:msg,
					icon:'none'
				});
				//更新storage用户信息和仓库用户信息
				this.initUserInfo(updatedUserInfo);
				//触发点击收藏事件
				uni.$emit('clickSaveLike')
			}
		},
	}
</script>

