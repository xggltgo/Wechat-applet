<template>
	<view class="login-container">
		<view class="image-container">
			<image src="/static/img/bg.png" mode="aspectFill"></image>
		</view>
		<view class="mode">
			<view class="account mode-item" :class="{active:mode==='account'}" @click="changeLoginMode('account')">
				账号登录
			</view>
			<view class="phone mode-item" :class="{active:mode==='phone'}" @click="changeLoginMode('phone')">
				手机登录
			</view>
		</view>
		<!-- 表单区域 -->
		<view class="form">
			<!-- 账号登录 -->
			<uni-forms :modelValue="formData" ref="form" :border="true" v-if="mode==='account'">
				<uni-forms-item label="账号" name="loginId">
					<input type="text" v-model="formData.loginId" placeholder="请输入账号" />
				</uni-forms-item>
				<uni-forms-item name="loginPwd" label="密码">
					<uni-easyinput type="password" v-model="formData.loginPwd" placeholder="请输入密码"></uni-easyinput>
				</uni-forms-item>
			</uni-forms>
			<!-- 手机登录 -->
			<uni-forms :modelValue="formData" ref="form" :border="true" v-else>
				<uni-forms-item label="手机号" name="phoneNumber">
					<input type="text" v-model="formData.phoneNumber" placeholder="请输入手机号" />
				</uni-forms-item>
				<uni-forms-item name="verificationCode" label="验证码">
					<input type="text" v-model="formData.verificationCode" placeholder="请输入验证码" />
					<VerificationCode @verificationCode="formData.remoteVerificationCode=$event"
						@getFormData="handleGetFormData"></VerificationCode>
				</uni-forms-item>
			</uni-forms>
		</view>
		<!--  -->
		<button type="default" @click="_handleLogin">立即登录</button>
		<view class="bottom">
			<view class="register" @click="linkToRegister">
				注册
			</view>
			<view class="forget">
				忘记密码
			</view>
		</view>
		
		<view class="system-tip" v-if="mode==='account'">
			<view class="system-tip-title">
				系统维护中，测试账号如下：
			</view>
			<view class="test-info">
			<view class="user-one">
				<text>①</text>
				<view class="system-tip-loginId">
					账号：admin
				</view>
				<view class="system-tip-loginPwd">
					密码：123456
				</view>
			</view>
			<view class="user-two">
				<text>②</text>
				<view class="system-tip-loginId">
					账号：qwer1234
				</view>
				<view class="system-tip-loginPwd">
					密码：qwer4321
				</view>
			</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'Login',
		onReady() {
			this.$refs.form.setRules(this.formRules);
		},
		data() {
			return {
				mode: 'account',
				formData: {
					loginId: '',
					loginPwd: '',
					phoneNumber: '',
					verificationCode: '',
					remoteVerificationCode: '',
				},

			}
		},
		methods: {
			async _handleLogin() {
				const res = await this.$refs.form.validate();
				const result = await this.$http.userLogin({
					...res,
					type: this.mode
				});
				if (result) {
					//存储用户信息
					this.initUserInfo(result);
					uni.showToast({
						title: '登录成功',
					});
					//登录成功后跳转回之前页面
					setTimeout(() => {
						const res = getCurrentPages()
						// #ifdef H5
						if(res.length>1){
						uni.navigateBack();
						}else{
							uni.switchTab({
								url: '/pages/index/index'
							})
						}
						// #endif
						// #ifndef H5
						if(res.length>1){
						uni.navigateBack();
						}else{
							uni.switchTab({
								url: '/pages/index/index'
							})
						}
						// #endif
					}, 1500);


				}

			},
			changeLoginMode(modeName) {
				this.mode = modeName;
				this.$refs.form.clearValidate([]);
				if(modeName==='phone'){
					uni.showToast({
						title:'官方审核签名配置中，手机登录功能暂时关闭',
						icon:'none',
						duration:2000,
						mask:true
					})
				}
			},
			handleGetFormData(callback) {
				callback && callback(this.$refs.form)
			},
			linkToRegister(){
				uni.navigateTo({
					url:'/pages/userInfo/register/register'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-container {
		background: #f8f8f8;
		height: 100vh;

		// 图片区域
		.image-container {
			height: 400rpx;
			width: 100%;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.mode {
			@include flex();
			align-items: flex-start;
			font-weight: bold;
			color: $c-9;
			font-size: 30rpx;
			padding: 0 146rpx;
			background: #f8f8fa;
			box-sizing: border-box;

			.mode-item {
				&.active {
					color: $base-color;
					position: relative;
					margin-bottom: 40rpx;

					&::after {
						content: '';
						position: absolute;
						height: 6rpx;
						width: 60rpx;
						background: $base-color;
						left: 50%;
						bottom: -20rpx;
						transform: translate(-50%, 0);
						border-radius: 4rpx;
					}
				}
			}
		}

		button {
			width: 640rpx;
			height: 90rpx;
			border-radius: 10rpx;
			background: $base-color;
			font-size: 30rpx;
			margin-top: 60rpx;
			color: #fff;
			line-height: 90rpx;
			letter-spacing: 3rpx;
		}

		.bottom {
			@include flex();
			width: 640rpx;
			margin: 20rpx auto;
			color: $c-9;
			font-size: 26rpx;
			text-decoration: underline;

		}
	}

	.system-tip{
		margin-top: 30rpx;
		padding: 30rpx;
		color: #333;
		font-size: 30rpx;
		margin: 70rpx;
		margin-top: 0;
		background: #fff;
		box-sizing: border-box;
		border-radius: 10rpx;
		box-shadow: 5rpx 5rpx 10rpx $base-color,-5rpx -5rpx 10rpx $base-color,;
		transform: rotate(-15deg) scale(0.9);
		.test-info{
			@include flex(flex-start);
			letter-spacing: 1rpx;
			font-size: 28rpx;
			.user-one{
				margin-right: 45rpx;
				.system-tip-loginId,.system-tip-loginPwd{
					text-shadow: 3rpx 3rpx 5rpx $base-color;
				}
			}
			.user-two{
				.system-tip-loginId,.system-tip-loginPwd{
					text-shadow: 3rpx 3rpx 5rpx #6b9eee;
				}
			}
			
		}
	}

	// uni-forms样式处理
	/deep/ .uni-forms-item {
		padding-left: 30rpx;
		background: #fff;
		box-sizing: border-box;
		position: relative;
		uni-easyinput{
			width: 100%;
			margin-right: 30rpx;
		}
		.uni-forms-item__content {
			@include flex();

			uni-input {
				flex-grow: 1;
			}

			/* #ifdef MP-WEIXIN */
			input {
				flex-grow: 1;
			}

			/* #endif */
			.verification-code-container {
				margin-right: 30rpx;
			}

		}

		input {
			font-size: 24rpx;
			height: 100%;
		}

		.uni-input-placeholder {
			color: #ccc;
		}
	}

	/deep/ .uni-easyinput__content {
		border: none !important;

		.uni-easyinput__content-input {
			padding-left: 0 !important;
			font-size: 24rpx;
		}
	}
</style>
