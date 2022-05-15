export default ({
	name,
	data = {}
}) => {
	return new Promise((resolve, reject) => {
		const loading = data.isLoading;
		data.isLoading && delete data.isLoading;
		!loading && uni.showLoading({ 
			title:'加载中'
		})
		uniCloud.callFunction({
			name,
			data,
			success({
				result
			}) {
				if (result.code === 0) {
					resolve(result.data)
				} else {
					uni.showToast({
						icon: 'none',
						title: result.msg,
					})
				}
			},
			fail() {
				reject(err)
			},
			complete() {
				!loading && uni.hideLoading()
			}
		})
	})
}
