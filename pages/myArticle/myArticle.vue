<template>
	<view class="my-article-container">
		<ArticleList :articleList="articleList" :isSearchPage="false" v-if="articleList.length"></ArticleList>
		<NoData :text="text" v-else></NoData>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.getMyArticle()
		},
		data() {
			return {
				articleList: [],
				text:'loading...'
			}
		},
		methods: {
			async getMyArticle() {
				const data = await this.$http.getMyArticle({
					userId: this.userInfo._id,
				})
				this.articleList = data;
				this.text='您还没有发布过文章'
			}
		}
	}
</script>

<style>

</style>
