<template>
	<view class="feed-back-container">
		<view class="feed-back-item">
			<view class="feed-back-title">
				意见反馈：
			</view>
			<view class="content">
				<textarea v-model="opinion" placeholder="请输入您要反馈的问题" />
			</view>
		</view>
		<view class="feed-back-item">
			<view class="feed-back-title">
				反馈图片：
			</view>
			<view class="images-container">
				<view class="image-item" v-for="(item,index) in uploadImages" :key="index">
					<view class="image">
						<image :src="item.url" mode="aspectFill"></image>
					</view>
					<view class="close-btn" @click="delImage(index)">
						<uni-icons type="closeempty" size="18" color="#fff"></uni-icons>
					</view>
				</view>
				<view v-if="uploadImages.length<5" class="upload-container image-item" @click="handleUploadImage">
					<view class="image">
						<uni-icons type="plusempty" size="45" color="#888"></uni-icons>
					</view>
				</view>
			</view>
		</view>
		<view class="submit" @click="handleSubmitFeedBack">
			<button type="warn" class="btn">提交反馈意见</button>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				opinion: '',
				uploadImages:[]
			}
		},
		methods: {
			async handleSubmitFeedBack(){
				if(!this.opinion){
					uni.showToast({
						title:'请填写内容后再进行反馈',
						icon:'none'
					});
					return
				}
				//图片上传云端 并获取到图片路径数组
				uni.showLoading();
				const cloundImageList = await Promise.all(this.getFileID());
				uni.hideLoading();
				//开始上传只云端数据库
				const {msg} = await this.$http.uploadFeedBack({
					opinion:this.opinion,
					cloundImageList,
					userId:this.userInfo._id,
				});
				uni.showToast({
					title:msg,
				});
				setTimeout(()=>{
					uni.switchTab({
						url:'/pages/self/self'
					})
				},1500);
			},
			handleUploadImage(){
				const count = 5 - this.uploadImages.length;
				uni.chooseImage({
					count,
					success: (res) => {
						const tempFilePaths = [...res.tempFilePaths];
						tempFilePaths.forEach((item,index)=>{
							if(index<count){
								this.uploadImages.push({
									url:item,
									name:res.tempFiles[index].name||`${Date.now().toString()}${index}.png`
								})
							}
						})
					}
				})
			},
			delImage(index){
				this.uploadImages.splice(index,1);
			},
			getFileID(){
				 return this.uploadImages.map(item => {
				        return new Promise(async resolve => {
				          const result = await uniCloud.uploadFile({
				            filePath: item.url,
				            cloudPath: item.name
				          })
				          resolve(result.fileID)
				        })
				      })
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.feed-back-container {
		.submit{
			padding: 0 30rpx;
			box-sizing: border-box;
		.btn {
			background: $base-color;
			font-size: 30rpx;
		}
		}

		.feed-back-item {
			.feed-back-title {
				margin: 30rpx;
				margin-bottom: 0;
				font-size: 28rpx;
				color: #666;
			}

			.content {
				margin: 30rpx;
				padding: 20rpx;
				box-sizing: border-box;
				border: 2rpx solid #eee;

				textarea {
					font-size: 24rpx;

				}
			}

			.images-container {
				padding: 20rpx;
				box-sizing: border-box;
				@include flex(flex-start, row, wrap);

				.upload-container {
					.image {
						@include flex(center);
					}
				}

				.image-item {
					width: 33.33%;
					height: 0;
					padding-top: 33.33%;
					box-sizing: border-box;
					position: relative;

					.image {
						position: absolute;
						border: 2rpx solid #eee;
						top: 10rpx;
						right: 10rpx;
						left: 10rpx;
						bottom: 10rpx;
						overflow: hidden;
						border-radius: 10rpx;

						image {
							height: 100%;
							width: 100%;
						}
					}

					.close-btn {
						position: absolute;
						top: 0;
						right: 0;
						background: $base-color;
						border-radius: 50%;
						@include flex(center)
					}
				}
			}
		}
	}
</style>
