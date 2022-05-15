import request from '@/ajax/http.js';

export const getLabelList = (data) => request({
	name: 'getLabelList',
	data,
})

export const getArticleList = (data) => request({
	name: 'getArticleList',
	data,
})

export const updateSaveLikeInfo = (data) => request({
	name: 'updateSaveLikeInfo',
	data
})

export const searchArticleList = (data) => request({
	name: 'searchArticleList',
	data
})

export const updatePersonLabel = (data) => request({
	name: 'updatePersonLabel',
	data,
})

//获取指定文章详情页数据
export const getArticleDetail = (data) => request({
	name: 'getArticleDetail',
	data,
})

export const publishComment = (data) => request({
	name: 'publishComment',
	data,
})

export const getArticleComment = (data) => request({
	name: 'getArticleComment',
	data,
})

//[取消]关注作者
export const updateFollowAuthor = (data) => request({
	name: 'updateFollowAuthor',
	data,
})

//[取消]点赞文章
export const updateThumbsUp = (data) => request({
	name: 'updateThumbsUp',
	data,
})