import request from '@/ajax/http.js';

//用户登录
export const userLogin = (data) => request({
	name: 'userLogin',
	data,
})

//获取验证码
export const getVerificationCode = (data) => request({
	name: 'getVerificationCode',
	data,
})