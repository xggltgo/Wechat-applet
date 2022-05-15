<template>
	<view class="verification-code-container" :class="{'count-down':isCountDown}" @click="getFormData">
		{{isCountDown?`${time}秒后重试`:'获取验证码'}}
	</view>
</template>

<script>
	export default {
		name: "VerificationCode",
		beforeDestroy() {
			clearInterval(this.timerId);
			this.timerId = null;
			this.isCountDown = false;
			this.time = 60;
		},
		data() {
			return {
				isCountDown: false,
				time: 60,
				timerId: null,
			};
		},
		methods: {
			getFormData() {
				if (this.isCountDown) {
					return
				}
				this.$emit('getFormData', this.getVerificationCode)
			},
			async getVerificationCode(formData) {
				const {
					phoneNumber
				} = await formData.validateField(['phoneNumber'])
				console.log(phoneNumber);
				if (phoneNumber) {
					this.countDown();
					const {
						verificationCode,
						msg
					} = await this.$http.getVerificationCode();
					uni.showToast({
						title: msg,
						icon: 'none'
					})
					this.$emit('verificationCode',verificationCode)
				}
			},
			countDown() {
				this.isCountDown = true;
				this.timerId = setInterval(() => {
					this.time--
					if (this.time === 0) {
						clearInterval(this.timerId);
						this.timerId = null;
						this.isCountDown = false;
						this.time = 60;
					}
				}, 1000)
			}
		},
	}
</script>

<style lang="scss" scoped>
	.verification-code-container {
		background-color: $base-color;
		color: #fff;
		padding: 20rpx;
		border-radius: 10rpx;
		opacity: .9;

		&.count-down {
			background-color: lighten($base-color, 15%);
		}
	}
</style>
