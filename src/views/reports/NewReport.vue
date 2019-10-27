<template>
	<el-card class="new-report-card" shadow="never">
		<h3 class="card-header" slot="header"> 写周报</h3>
		<el-form ref="reportForm" :model="newReport" class="new-form" label-width="120px" label-position="left" :rules="rules">
			<el-row :gutter="60">
				<el-col :span="12">
					<el-form-item class="new-item" label="周 报 时 间" prop="time">
						<el-date-picker v-model="newReport.time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" @change="checkSelected">
						</el-date-picker>
					</el-form-item>
					<el-form-item class="new-item" label="业 务 性 质" prop="bizType">
						<el-select v-model="newReport.bizType" placeholder="请选择业务性质">
							<el-option v-for="item in bizOpt" :key="item.type" :label="item.text" :value="item.type"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item class="new-item" label="抄送部门经理" required>
						<el-input v-model="departmentManager.realName" disabled></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item class="new-item" label="计划完成时间" prop="finishTime">
						<el-date-picker v-model="newReport.finishTime" placeholder="请选择时间" value-format="yyyy-MM-dd">
						</el-date-picker>
					</el-form-item>
					<el-form-item class="new-item" label="当 前 进 度" prop="state">
						<el-select v-model="newReport.state" placeholder="请选择当前进度">
							<el-option v-for="item in stateOpt" :key="item.index" :label="item.text" :value="item.index"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item class="new-item" label="抄 送 组 员" prop="carbonCopy">
						<el-select v-model="newReport.carbonCopy" placeholder="请选择抄送组员" multiple>
							<el-option v-for="item in departmentMembers" :key="item.username" :label="item.realName" :value="item.username">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-form-item class="new-item content-item" label="周 报 内 容" prop="content">
				<el-input class="content-input" type="textarea" resize="none" placeholder="请输入周报内容" v-model="newReport.content"></el-input>
			</el-form-item>
			<el-form-item class="new-item remark-item" label="备 注 说 明" prop="remark">
				<el-input class="remark-input" type="textarea" resize="none" placeholder=" 请输入备注内容，如工作难点总结，下周计划等等.." v-model="newReport.remark" show-word-limit></el-input>
			</el-form-item>
		</el-form>
		<p class="commit-btns">
			<el-button>取消</el-button>
			<el-button type="primary" plain="">保存</el-button>
			<el-button type="primary" @click="submitReport">提交</el-button>
		</p>
	</el-card>
</template>

<script>
import moment from 'moment';
import { mapState, mapActions } from 'vuex';
import { addReport } from '@/store/api/reports';

export default {
	components: {},
	data () {
		return {
			newReport: {
				time: [],
				content: '',
				finishTime: '',
				remark: '',
				state: '',
				bizType: '',
				carbonCopy: []
			},
			bizOpt: [
				{
					type: 0,
					text: '业务需求'
				}
			],
			stateOpt: [
				{
					index: 0,
					text: '产品规划'
				},
				{
					index: 1,
					text: '研发规划'
				},
				{
					index: 2,
					text: '开发中'
				},
				{
					index: 3,
					text: '待测试'
				},
				{
					index: 4,
					text: '完成'
				}
			],
			rules: {
				time: [{ type: 'array', required: true, message: '请选择周报时间段', trigger: 'blur' }],
				content: [{ required: true, message: '请输入周报内容', trigger: 'blur' }],
				finishTime: [{ required: true, message: '请选择计划完成时间', trigger: 'blur' }],
				bizType: [{ required: true, message: '请选择业务性质', trigger: 'blur' }],
				state: [{ required: true, message: '请选择当前开发进度', trigger: 'blur' }],
			},
		};
	},
	computed: {
		...mapState('reports', ['members']),
		departmentManager () {
			const { members } = this;
			if (members.length !== 0) {
				return members.filter((item) => {
					return item.roleId === 2;
				})[0];
			}
			return {};
		},
		departmentMembers () {
			const { members } = this;
			if (members.length !== 0) {
				return members.filter((item) => {
					return item.roleId === 3;
				});
			}
			return [];
		}
	},
	methods: {
		...mapActions('reports', ['loadMembers']),
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
		},
		submitReport () {
			this.$refs['reportForm'].validate((vaild) => {
				if (vaild) {
					const params = { ...this.newReport };
					delete params.time;

					if (!params.remark) {
						params.remark = '';
					}

					params.carbonCopy.push(this.departmentManager.username);

					addReport(params).then(() => {
						this.$message.success('提交成功');
						this.$refs.reportForm.resetFields();
					}).catch((err) => {
						this.$message.error(err.message);
					})

				} else {
					this.$message.warning('提交失败，请检查填写的内容！')
				}
			})

		},
	},
	created () {
		this.loadMembers();
	},
}
</script>
<style type='text/less' lang='less'>
.new-report-card {
	.new-form {
		padding: 10px 60px;
		.el-form-item__label {
			font-weight: 500;
		}

		.el-input,
		.el-date-editor {
			width: 350px;
		}
		.el-input__inner {
			border: none;
			border-bottom: 1px solid #dcdfe6;
			border-radius: 0;
		}
	}
	.el-input.is-disabled .el-input__inner {
		border-color: #e4e7ed;
	}

	.remark-item .el-textarea__inner,
	.content-item .el-textarea__inner {
		width: 97%;
	}
	.content-input .el-textarea__inner {
		height: 230px;
	}
	.commit-btns {
		padding: 0 80px;
		text-align: right;
	}
}
</style>