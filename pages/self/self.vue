<template>
	<view class="self-container">
		<view class="not-login" v-if="!userInfo" @click="linkToLogin">
			<view class="image">
				<image src="/static/img/a.gif" mode="aspectFill"></image>
			</view>
			<view class="tips">
				Hi，您尚未登录，请点击登录
			</view>
			<view class="icon">
				<uni-icons type="right" size="17"></uni-icons>
			</view>
		</view>

		<view class="had-login" v-if="userInfo">
			<view class="bg-image">
				<image :src="userInfo.avatar" mode="aspectFill"></image>
			</view>
			<view class="content-info">
				<view class="avatar" @click="changeAvatar">
					<image :src="userInfo.avatar" mode="aspectFill"></image>
				</view>
				<view class="name">
					{{userInfo.author_name}}
				</view>
				<view class="desc">
					<view class="item">
						<text class="title">被关注</text>
						<text class="number">{{userInfo.follow_count}}</text>
					</view>
					<view class="item">
						<text class="title">粉丝</text>
						<text class="number">{{userInfo.fans_count}}</text>
					</view>
					<view class="item">
						<text class="title">积分</text>
						<text class="number">{{userInfo.integral_count||0}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="info-type">
			<view class="item" @click="linkToMyArticle">
				<view class="icon">
					<uni-icons type="person-filled" size="20"></uni-icons>
				</view>
				<view class="title">
					我的文章
				</view>
				<view class="icon">
					<uni-icons type="right" size="17"></uni-icons>
				</view>
			</view>
			<view class="item" @click="linkToFeedBack">
				<view class="icon">
					<uni-icons type="help" size="20" color="#000"></uni-icons>
				</view>
				<view class="title">
					意见反馈
				</view>
				<view class="icon">
					<uni-icons type="right" size="17"></uni-icons>
				</view>
			</view>
			<!-- #ifdef APP-PLUS -->
			<view class="item" @click="haveNewVersion&&_getNewVersion">
				<view class="icon">
					<uni-icons type="paperclip" size="20" color="#000"></uni-icons>
				</view>
				<view class="title">
					当前版本
					<text class="tips" v-if="haveNewVersion">(点击下载最新版本)</text>
				</view>
				<view class="version">
					{{currentVersion}}
				</view>
				<view class="icon">
					<uni-icons type="right" size="17"></uni-icons>
				</view>
			</view>
			<!-- #endif -->
		</view>

		<view class="button" @click="handleLoginOut" v-if="userInfo">
			<button type="warn" class="login-out">退出</button>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			// !判断是否有新版本进行下载及获取当前的版本
			// #ifdef APP-PLUS
			uni.getSystemInfo({
				success: (res) => {
					if (res.platform == "android") {
						plus.runtime.getProperty(plus.runtime.appid, wgtinfo => {
							this.currentVersion = wgitinfo;
							this._checkVersion();
						})
					}
				}
			})
			// #endif
		},
		data() {
			return {
				haveNewVersion: false,
				currentVersion: '1.0.0',
			}
		},
		methods: {
			linkToLogin() {
				uni.navigateTo({
					url: '/pages/userInfo/login/login'
				})
			},
			handleLoginOut() {
				this.initUserInfo(null);
				uni.navigateTo({
					url: '/pages/index/index'
				})
			},
			// app中判断是否有新版本
			async _checkVersion() {
				const {
					version,
					downLoadLinkUrl
				} = await this.$http.getCurrentVersion();
				if (version > this.currentVersion) {
					this.haveNewVersion = true;
					this.downLoadLinkUrl = downLoadLinkUrl
				}
			},
			// 获取最新版本app下载
			_getNewVersion() {
				uni.showLoading({
					title: '下载中，请稍后'
				});
				var dtask = plus.downloader.createDownload(this.downLoadLinkUrl, {}, function(d, status) {
					// 下载完成  
					uni.hideLoading({})
					if (status == 200) {
						plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename), {}, {}, function(
							error) {
							uni.showToast({
								title: '安装失败',
								duration: 1500,
								icon: 'none'
							});
						})
					} else {
						uni.showToast({
							title: '更新失败',
							duration: 1500,
							icon: 'none'
						});
					}
				});
				dtask.start();
			},
			async linkToMyArticle() {
				await this.whoAmI();
				uni.navigateTo({
					url: '/pages/myArticle/myArticle'
				})
			},
			async linkToFeedBack() {
				await this.whoAmI();
				uni.navigateTo({
					url: '/pages/feedBack/feedBack'
				})
			},
			changeAvatar() {
				uni.chooseImage({
					count: 1,
					success: async (res) => {
						const fileID = await this.uploadAvatar(res.tempFilePaths[0], res.tempFiles[0].name);
						await this.updateAvatar(fileID);
					}
				})
			},
			async uploadAvatar(filePath, cloudPath = `avatar${Date.now().toString()}.jpg`) {
				const {
					fileID
				} = await uniCloud.uploadFile({
					filePath,
					cloudPath,
				})
				return fileID;
			},
			async updateAvatar(fileID) {
				const {
					msg
				} = await this.$http.updateAvatar({
					avatarUrl: fileID,
					userId: this.userInfo._id,
				})
				uni.showToast({
					title: msg
				});
				this.initUserInfo({
					...this.userInfo,
					avatar: fileID
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
		background: $bg;
	}

	.self-container {
		height: 100%;
		/* #ifdef MP-WEIXIN */
		height: 100vh;
		background: $bg;
		/* #endif */
		font-size: 28rpx;
		color: #333;

		.button {
			padding: 0 30rpx;

			.login-out {
				margin-top: 100rpx;
				font-size: 32rpx;
				background-color: $base-color;
			}
		}


		.not-login {
			@include flex(flex-start);
			padding: 30rpx;
			box-sizing: border-box;
			margin-bottom: 20rpx;
			background: #fff;

			.image {
				width: 90rpx;
				height: 90rpx;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.tips {
				flex-grow: 1;
				margin-left: 60rpx;
			}
		}


		.had-login {
			position: relative;
			padding-bottom: 40rpx;
			box-sizing: border-box;
			height: 380rpx;
			margin-bottom: 20rpx;

			.bg-image {
				position: absolute;
				top: 0;
				right: 0;
				left: 0;
				bottom: 0;
				opacity: 0.3;
				filter: blur(8px);
				overflow: hidden;
				z-index: 3;

				image {
					height: 100%;
					width: 100%;
				}

			}

			.content-info {
				position: absolute;
				top: 0;
				right: 0;
				left: 0;
				bottom: 0;
				z-index: 99;
				@include flex(flex-start, column);

				.avatar {
					width: 140rpx;
					height: 140rpx;
					overflow: hidden;
					border-radius: 50%;
					margin-top: 60rpx;

					image {
						height: 100%;
						width: 100%;
					}
				}

				.name {
					margin: 30rpx 0;
					font-weight: bold;
					font-size: 30rpx;
				}

				.desc {
					@include flex(space-around);
					width: 100%;

					.item {
						@include flex(flex-start, column);

						.number {
							font-size: 24rpx;
							color: #3f3f3f;
							margin-top: 5rpx;
						}
					}
				}
			}

		}


		.info-type {
			.item {
				@include flex(flex-start);
				background: #fff;
				margin-bottom: 20rpx;
				padding: 30rpx;
				box-sizing: border-box;

				.title {
					flex-grow: 1;
					margin-left: 20rpx;

					.tips {
						font-size: 20rpx;
						color: $base-color;
					}
				}

				.version {
					margin-right: 30rpx;
					color: #888;
				}
			}

		}

	}
</style>
