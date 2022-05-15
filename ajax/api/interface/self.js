import request from '@/ajax/http.js';

export const getCurrentVersion = (data) => request({
	name: 'getCurrentVersion',
	data,
})

export const getMyArticle = (data) => request({
	name: 'getMyArticle',
	data,
})

export const uploadFeedBack = (data) => request({
	name: 'uploadFeedBack',
	data,
})

export const updateAvatar = (data) => request({
	name: 'updateAvatar',
	data,
})