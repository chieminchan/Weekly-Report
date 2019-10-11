<template>
	<el-card class="new-report-card" shadow="never">
		<h3 class="card-header" slot="header">
			写周报
		</h3>
		<el-form :mode="newReport" class="new-form" label-width="120px" label-position="left">
			<el-form-item class="new-item" label="周 报 时 间">
				<el-date-picker v-model="newReport.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" @change="checkSelected">
				</el-date-picker>
			</el-form-item>
			<el-form-item class="new-item" label="计划完成时间">
				<el-date-picker v-model="newReport.finishTime" placeholder="请选择时间" value-format="yyyy-MM-dd">
				</el-date-picker>
			</el-form-item>
			<el-form-item class="new-item" label="业 务 性 质">
				<el-select v-model="newReport.bizType" placeholder="请选择业务性质">
					<el-option v-for="item in bizOpt" :key="item.type" :label="item.text" :value="item.type"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item class="new-item" label="周 报 内 容">
				<el-input class="content-input" type="textarea" resize="none" placeholder="请输入周报内容" v-model="newReport.content" show-word-limit></el-input>
			</el-form-item>
			<el-form-item class="new-item" label="备 注 说 明">
				<el-input class="remark-input" type="textarea" resize="none" placeholder=" 请输入备注内容" v-model="newReport.remark" show-word-limit></el-input>
			</el-form-item>
		</el-form>
		<p class="commit-btns">
			<el-button>取消</el-button>
			<el-button type="primary">确定</el-button>
		</p>
	</el-card>
</template>

<script>
import moment from 'moment';

export default {
	components: {},
	data () {
		return {
			newReport: {},
			bizOpt: [
				{
					type: 0,
					text: '业务需求'
				}
			]

		};
	},
	computed: {},
	methods: {
		checkSelected () {
			const { time } = this.newReport;
			if (time.length !== 2) {
				this.$message.warning('请选择开始时间和结束时间');
				return false;
			}

			let startAt = time[0];
			let endAt = time[1];
			const diffDays = moment(endAt).diff(moment(startAt), 'days');

			if (diffDays > 7) {
				this.$message.warning('时间范围不能大于一周，请重新选择！');
				this.newReport.time = [];
				delete this.newReport.startTime;
				delete this.newReport.endTime;
				return false;
			}

			this.newReport.startTime = startAt;
			this.newReport.endTime = endAt;
			return true;
		}
	},
	mounted () { },
}
</script>
<style type='text/less' lang='less'>
.new-report-card {
	.new-form {
		margin-left: 30px;
		.el-form-item__label {
			font-weight: 500;
		}

		.el-input,
		.el-date-editor {
			width: 400px;
		}
		.el-input__inner {
			border: none;
			border-bottom: 1px solid #dcdfe6;
			border-radius: 0;
		}
	}
	.new-item {
		width: 70%;
	}
	.content-input .el-textarea__inner {
		height: 250px;
	}
	.commit-btns {
		padding: 10px 30px;
		text-align: right;
	}
}
</style>