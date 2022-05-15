'use strict';
exports.main = async (event, context) => {
	const verificationCode = Math.random().toString().substring(2, 8)
	//返回数据给客户端
	return {
		code: 0,
		msg: '',
		data: {
			verificationCode,
			msg:'请注意查收短信验证码'
		}
	}
};
