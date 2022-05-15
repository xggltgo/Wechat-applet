<template>
	<view class="nav-bar-container">
		<view class="container">
			<!-- 占位(处理小程序顶部状态栏区域) -->
			<view :style="{height:statusBarHeight + 'rpx'}"></view>

			<!-- 如果是搜索界面的单独处理 -->
			<view @click="backToArticleList" v-if="isSearchPage" class="icon" :style="{top:statusBarHeight + 'rpx'}">
				<uni-icons type="back" size="22" color="#fff"></uni-icons>
			</view>

			<!-- 搜索区域 -->
			<view class="search" @click="linkToSearchPage"
				:style="{marginRight:searchMarginRight+'rpx',marginLeft:isSearchPage?'30rpx':''}">
				<uni-icons type="search" size="mini" color="#999"></uni-icons>
				<view class="searchText" v-if="!isSearchPage">
					输入文章标题进行搜索
				</view>
				<input focus v-model.trim="searchText" v-if="isSearchPage" type="text" placeholder="输入文章标题进行搜索" confirm-type="搜索" @confirm="confirmSearch"  />
			</view>
		</view>
		<!-- 占位(解决绝对定位覆盖后继元素的问题) -->
		<view :style="{height:statusBarHeight+80+'rpx'}"></view>
	</view>
</template>

<script>
	export default {
		name: "NavBar",
		props: {
			isSearchPage: {
				type: Boolean,
				default: false
			},
			oldSearchText:{
				type:String,
			}
		},
		created() {
			this.handleStateBarHeigh()
		},
		data() {
			return {
				statusBarHeight: 20,
				searchMarginRight: 0,
			};
		},
		computed: {
			searchText:{
				get(){
					return this.oldSearchText
				},
				set(val){
					this.$emit('updateSearchText',val)
				}
			}
		},
		methods: {
			handleStateBarHeigh() {
				const systemInfo = uni.getSystemInfoSync(); //获取系统信息（同步接口）
				systemInfo.statusBarHeight && (this.statusBarHeight = systemInfo.statusBarHeight * 2); //获取系统信息中状态栏的高度
				//针对微信小程序特殊处理
				// #ifdef MP-WEIXIN 
				const menuButtonInfo = uni.getMenuButtonBoundingClientRect() //获取小程序胶囊按钮的布局位置信息
				this.statusBarHeight = menuButtonInfo.top * 2; //设置占位区域与胶囊按钮离顶部距离相同
				this.searchMarginRight = menuButtonInfo.width * 2; //设置搜索区域右外边距等于胶囊按钮宽度 空出胶囊按钮位置
				// #endif
			},
			linkToSearchPage() {
				if (this.isSearchPage) {
					return
				}
				uni.navigateTo({
					url: '/pages/search/search'
				})
			},
			backToArticleList() {
				// #ifdef H5
				uni.switchTab({
					url: '/pages/index/index'
				})
				// #endif
				// #ifndef H5
				uni.navigateBack()
				// #endif
			},
			confirmSearch(){
				//点击搜索后
				// if(!this.searchText){
				// 	return
				// }
				this.$emit('confirmSearch')
			}
		},
	}
</script>

<style lang="scss" scoped>
	.nav-bar-container {
		width: 100%;

		.container {
			background: $base-color;
			width: 100%;
			position: fixed;
			left: 0;
			top: 0;
			padding: 0 30rpx 20rpx;
			box-sizing: border-box;
			z-index: 99;

			.icon {
				position: absolute;
				left: 10rpx;
				height: 60rpx;
				@include flex(center);
			}

			.search {
				background: #fff;
				@include flex(flex-start);
				border-radius: 30rpx;
				height: 60rpx;
				padding-left: 20rpx;
				box-sizing: border-box;

				.searchText {
					color: $c-9;
					font-size: 28rpx;
					margin-left: 20rpx;
				}
				input{
					font-size: 28rpx;
					padding-left: 20rpx;
					box-sizing: border-box;
					color: #333;
					flex-grow: 1;
				}
			}
		}
	}
</style>
