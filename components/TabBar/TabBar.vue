<template>
	<view class="tab-bar-container">
		<scroll-view scroll-x="true" class="scroll-area" :scroll-with-animation="true" :scroll-into-view="scrollId">
			<view class="scroll-container">
				<view @click="handleClick(index)" class="scroll-item" :class="{active:index===currentIndex}"
					v-for="(item,index) in labelList" :key="item.id" :id="`scrollId${index}`">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<view class="icon" @click="initLableManage">
			<uni-icons type="gear" size="26" color="#666"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		name: "TabBar",
		props: {
			labelList: {
				type: Array,
				required: true,
			},
			currentIndex: {
				type: Number,
				required: true
			}
		},
		data() {
			return {
				scrollId: ''
			};
		},
		methods: {
			handleClick(index) {
				this.$emit('activeChange', index)
			},
			async initLableManage() {
				await this.whoAmI();
				uni.navigateTo({
					url: '/pages/labelManage/labelManage'
				})
			}
		},
		watch: {
			currentIndex(newIndex) {
				this.scrollId = `scrollId${newIndex}`
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tab-bar-container {
		@include flex();
		width: 100%;
		background: #fff;
		box-sizing: border-box;
		border-bottom: 1px solid #f5f5f5;

		.scroll-area {
			height: 90rpx;
			flex-grow: 1;

			.scroll-container {
				height: 90rpx;
				@include flex(flex-start);

				.scroll-item {
					flex-shrink: 0;
					padding: 0 20rpx;
					font-size: 28rpx;
					box-sizing: border-box;
					color: #333;

					&.active {
						color: $base-color;
					}
				}
			}
		}

		.icon {
			width: 90rpx;
			@include flex(center);
			position: relative;

			&::after {
				content: '';
				position: absolute;
				left: 0;
				width: 2rpx;
				height: 30rpx;
				background: #ddd;
			}
		}
	}
</style>
