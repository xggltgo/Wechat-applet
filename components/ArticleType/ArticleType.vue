<template>
	<view class="article-type-container">
		<swiper class="swiper-container" :current="currentIndex" @change="handleChange">
			<swiper-item v-for="(item,index) in labelList" :key="item.id">
				<view class="swiper-item">
					<ArticleList :isLoading="loadInfo[index]" @loadMore="handleLoadMore" v-if="articleList[index]"
						:articleList="articleList[index]">
					</ArticleList>
					<NoData text="loading..." :containerHeight="100" v-else></NoData>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		name: "ArticleType",
		props: {
			labelList: {
				type: Array,
				required: true
			},
			currentIndex: {
				type: Number,
				required: true,
			}
		},
		created() {
			this.labelList.length && this._getArticleList(this.currentIndex);
		},
		data() {
			return {
				articleList: {},
				limit: 6,
				loadInfo: {},
				isLoadingMore: false,
			};
		},
		methods: {
			handleChange(e) {
				this.$emit('activeChange', e.detail.current);
				if (!this.articleList[e.detail.current] && e.detail.current !== 0) {
					this._getArticleList(e.detail.current);
				}
			},
			async _getArticleList(currentIndex) {
				if (!this.loadInfo[currentIndex]) {
					this.loadInfo[currentIndex] = {
						page: 1,
						loading: 'loading',
						total: 0
					}
				}
				const {
					articleList,
					total
				} = await this.$http.getArticleList({
					classify: this.labelList[currentIndex].name,
					page: this.loadInfo[currentIndex].page,
					limit: this.limit
				})
				let currentArticleList = this.articleList[currentIndex] || [];
				currentArticleList = currentArticleList.concat(articleList);
				this.$set(this.articleList, currentIndex, currentArticleList);
				this.loadInfo[currentIndex].total = total;
			},
			async handleLoadMore() {
				if (this.loadInfo[this.currentIndex].total === this.articleList[this.currentIndex].length) {
					this.loadInfo[this.currentIndex] = {
						...this.loadInfo[this.currentIndex],
						loading: 'noMore'
					};
					this.$forceUpdate();
					return;
				}
				if (this.isLoadingMore) {
					return;
				}
				this.isLoadingMore = true;
				this.loadInfo[this.currentIndex].page++;
				await this._getArticleList(this.currentIndex);
				this.isLoadingMore = false;
			}
		},
		watch: {
			labelList(newVal, oldVal) {
				if (JSON.stringify(newVal) === JSON.stringify(oldVal)) {
					return;
				}
				this.articleList = {};
				this.loadInfo = {};
				this._getArticleList(this.currentIndex);
			}
		},

	}
</script>

<style lang="scss" scoped>
	.article-type-container {
		height: 100%;
		width: 100%;
	}

	.swiper-container {
		height: 100%;

		.swiper-item {
			height: 100%;
		}
	}
</style>
