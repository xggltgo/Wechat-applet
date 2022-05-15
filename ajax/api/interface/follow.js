import request from '@/ajax/http.js';

export const getSaveLikeArticle = (data) => request({
	name: 'getSaveLikeArticle',
	data,
})

export const getFollowAuthor = (data) => request({
	name: 'getFollowAuthor',
	data,
})