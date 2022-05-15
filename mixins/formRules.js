export default {
	install(Vue) {
		Vue.mixin({
			data() {
				return {
					formRules: {
						loginId: {
							rules: [{
									required: true,
									errorMessage: '您还未输入账号',
								},
								{
									minLength: 5,
									maxLength: 12,
									errorMessage: '账号长度应在 {minLength} 到 {maxLength} 位之间',
								}
							]
						},
						loginPwd: {
							rules: [{
								required: true,
								errorMessage: '您还未输入密码',
							}, ]
						},
						phoneNumber: {
							rules: [{
									required: true,
									errorMessage: '您还未输入手机号',
								},
								{
									validateFunction: function(rule, value, data, callback) {
										const reg =
											/^(0|86|17951)?(13[0-9]|15[012356789]|166|199|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
										if (!reg.test(value)) {
											callback('您的手机号格式有误')
										}
									}
								}
							]
						},
						verificationCode: {
							rules: [{
									required: true,
									errorMessage: '您还未输入验证码',
								},
								{
									validateFunction: function(rule, value, data, callback) {
										if (value !== data.remoteVerificationCode) {
											callback('验证码不正确')
										}
									}
								}
							]
						},

					}
				}
			}
		})
	}
}
