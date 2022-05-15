<template>
	<view class="label-manage-container">
		<view class="my-label" style="margin-bottom: 20rpx;">
			<view class="label-header">
				<text class="title">我的标签</text>
				<text class="edit" @click="handleEdit">{{isEditing?'完成':'编辑'}}</text>
			</view>
			<view class="label-content">
				<view class="label-content-item" v-for="item in myLabels" :key="item._id">
					{{item.name}}
					<view class="icon" v-if="isEditing" @click="deleteLabel(item)">
						<uni-icons type="clear" size="20" color="#ff6370"></uni-icons>
					</view>
				</view>
				<view class="no-data" v-if="!myLabels.length">
					当前没有数据
				</view>
			</view>
		</view>

		<view class="recommend-label">
			<view class="label-header">
				<text class="title">标签推荐</text>
			</view>
			<view class="label-content">
				<view @click="addLabel(item)" class="label-content-item" v-for="item in recommendLabels" :key="item._id">
					{{item.name}}
				</view>
				<view class="no-data" v-if="!recommendLabels.length">
					当前没有数据
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,mapMutations
	} from 'vuex';
	export default {
		name: 'labelManage',
		onLoad() {
			this.pageLabelList = [...this.userInfo.person_label_ids]
		},
		data() {
			return {
				isEditing: false,
				pageLabelList: [],
			}
		},
		computed: {
			...mapState('labelList', ['labelList']),
			myLabels() {
				return this.labelList.filter(item => this.pageLabelList.includes(item._id));
			},
			recommendLabels() {
				return this.labelList.filter(item => !this.pageLabelList.includes(item._id) && item.name !== '全部');
			}
		},
		methods: {
			async handleEdit() {
				this.isEditing = !this.isEditing; //false-->true
				if(!this.isEditing){
					const {msg} = await this.$http.updatePersonLabel({
						userId:this.userInfo._id,
						personLablesId:[...this.pageLabelList]
					})
					uni.showToast({
						title:msg,
						icon:'none',
					});
					this.initUserInfo({...this.userInfo,person_label_ids:[...this.pageLabelList]})
				}
			},
			addLabel(item) {
				if(!this.isEditing){
					return
				}
				this.pageLabelList.push(item._id)
			},
			deleteLabel(item){
				this.pageLabelList = this.pageLabelList.filter(id=>id!==item._id)
			},
		},
		// watch: {
		// 	userInfo: {
		// 		immediate: true,
		// 		handler(){
		// 			this.pageLabelList = [...this.userInfo.person_label_ids];
		// 		}
		// 	}
		// }
	}
</script>

<style lang="scss" scoped>
	page {
		background: $bg;
	}

	.label-manage-container {

		.my-label,
		.recommend-label {
			font-size: 28rpx;
			background: #fff;

			.label-header {
				@include flex();
				padding: 20rpx 30rpx;
				border-bottom: 2rpx solid #F5F5F5;
				box-sizing: border-box;

				.title {
					color: #666;
				}

				.edit {
					color: #18BC37;
					font-weight: bold;
				}

			}

			.label-content {
				padding: 30rpx;
				@include flex(flex-start, row, wrap);

				.label-content-item {
					padding: 10rpx 20rpx;
					border: 2rpx solid #666;
					border-radius: 10rpx;
					margin-right: 20rpx;
					margin-bottom: 20rpx;
					font-size: 24rpx;
					color: #333;
					box-sizing: border-box;
					position: relative;

					.icon {
						position: absolute;
						top: -16rpx;
						right: -16rpx;
						z-index: 99;
						background: #FFFFFF;
						border-radius: 50%;
					}
				}

				.no-data {
					width: 100%;
					height: 200rpx;
					@include flex(center);
					font-size: 24rpx;
					color: $c-9;
				}
			}
		}
	}
</style>
