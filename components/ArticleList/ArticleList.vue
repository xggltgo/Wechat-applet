<template>
	<view class="article-list-container">
		<scroll-view scroll-y="true" class="scroll-area" @scrolltolower="loadMore">
			<view class="scroll-container">
				<view v-for="(item,index) in articleList" :key="item.id">
					<ArticleListItem @canSaveHistory="$emit('canSaveHistory')" :articleInfo="item"></ArticleListItem>
				</view>
			</view>
			<uni-load-more v-if="isSearchPage&&(articleList.length===0||articleList.length>=6)"
				:status="isLoading.loading"></uni-load-more>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "ArticleList",
		props: {
			articleList: {
				type: Array,
			},
			isLoading: {
				type: Object,
				default () {
					return {
						loading: 'loading'
					}
				}
			},
			isSearchPage: {
				type: Boolean,
				default: true,
			}
		},
		methods: {
			loadMore() {
				this.$emit('loadMore')
			}
		},
	}
</script>

<style lang="scss" scoped>
	.article-list-container {
		height: 100%;

		.scroll-area {
			height: 100%;
			overflow: hidden;
		}
	}
</style>
