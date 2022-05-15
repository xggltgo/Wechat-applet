'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const {
		loginId,
		loginPwd,
		phoneNumber,
		type
	} = event;
	const {
		affectedDocs,
		data
	} = await db.collection('user').aggregate().match(
		type === 'account' ? {
			loginId,
			loginPwd
		} : {
			phoneNumber
		}
	).end();

	console.log(data);


	//返回数据给客户端
	if (affectedDocs) {
		return {
			code: 0,
			msg: '登录成功',
			data: data[0]
		}
	} else {
		return {
			code: '',
			msg: type === 'account' ? '账号或者密码有误' : '手机号或者验证码有误'
		}
	}

};
