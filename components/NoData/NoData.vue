<template>
	<view class="no-data-container" :style="{height:containerHeight+'rpx',backgroundColor:bgColor}">
		{{text}}
	</view>
</template>

<script>
	export default {
		name: "NoData",
		props: {
			text: {
				type: String,
				default:'暂无数据'
			},
			containerHeight:{
				type:Number,
				default:400
			},
			bgColor:{
				type:String,
			}
		}
	}
</script>

<style lang="scss" scoped>
	.no-data-container {
		height: 400rpx;
		@include flex(center);
		font-size: 24rpx;
		color: $c-9;
	}
</style>
