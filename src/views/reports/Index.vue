<template>
	<el-card class="reports-card">
		<h3 class="card-header" slot="header">我的周报</h3>

		<div class="filter">
			<p class="filter-item daterange-input">
				周报日期:
				<el-date-picker type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
				</el-date-picker>
			</p>
		</div>

		<el-table class="reports-table" :data="myReports">
			<el-table-column label="周报日期" width="190" sortable align="center">
				<template slot-scope="scope">{{ scope.row | formatDate }}</template>
			</el-table-column>
			<el-table-column label="业务性质" prop="bizType" align="center">
				<template slot-scope="scope">{{ scope.row.bizType | formatBizType }}</template>
			</el-table-column>
			<el-table-column label="周报内容" prop="content" align="center"></el-table-column>
			<el-table-column label="当前进度" prop="state" align="center">
				<template slot-scope="scope">{{ scope.row.state | formatState }}</template>
			</el-table-column>
			<el-table-column label="计划完成时间" prop="finishTime" sortable align="center" width="130"></el-table-column>
			<!-- <el-table-column label="提交时间" prop="createTime" align="center" width="160"></el-table-column> -->
			<el-table-column label="抄送组员" prop="members" align="center" width="180">
				<template slot-scope="scope">{{ scope.row.carbonCopy | formatCc }}</template>
			</el-table-column>
			<el-table-column label="备注说明" prop="remark" align="center"></el-table-column>
			<el-table-column label="操作" width="250">
				<template slot-scope="scope">
					<el-button size="small" type="primary" plain :disabled="scope.row.commitState === 1">编辑</el-button>
					<el-button size="small" type="primary" plain @click="handleDetail(scope.row)">详情</el-button>
					<el-button size="small" type="success" plain>导出</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-pagination class="pagination-row" :page-sizes="[5, 10, 15, 20]" :current-page.sync="current" :page-size.sync="size" layout="sizes, prev, pager, next" :total="total">
		</el-pagination>

		<el-dialog :visible.sync="detailDialogVisible" title="周报详情">
			<div class="detail-wrapper">
				<p class="detail-item">
					<span class="detail-lable">周 报 日 期：</span>
					<span class="detail-val">
						{{`${selecteReport.startTime} 至 ${selecteReport.endTime}`}}
					</span>
				</p>
				<p class="detail-item">
					<span class="detail-lable">业 务 性 质 ：</span>
					<span class="detail-val">
						{{selecteReport.bizType | formatBizType}}
					</span>
				</p>
				<p class="detail-item">
					<span class="detail-lable">当 前 进 度 ：</span>
					<span class="detail-val">
						{{selecteReport.state | formatState}}
					</span>
				</p>
				<p class="detail-item">
					<span class="detail-lable">计划完成时间 ：</span>
					<span class="detail-val">
						{{selecteReport.finishTime}}
					</span>
				</p>
				<p class="detail-item">
					<span class="detail-lable">抄 送 成 员 ：</span>
					<span class="detail-val">
						<template v-for="item in selecteReport.carbonCopy">
							{{ item }},
						</template>
					</span>
				</p>
				<p class="detail-item">
					<span class="detail-lable">周 报 内 容 ：</span>
					<span class="detail-val">
						{{selecteReport.content}}
					</span>
				</p>
				<p class="detail-item">
					<span class="detail-lable">备 注 内 容 ：</span>
					<span class="detail-val">
						{{selecteReport.remark}}
					</span>
				</p>
			</div>
		</el-dialog>

	</el-card>
</template>

<script>
import { loadReports, addReport } from '@/store/api/reports';
import { isArray } from 'util';

export default {
	data () {
		return {
			total: 100,
			size: 10,
			current: 1,
			myReports: [],
			detailDialogVisible: false,
			selecteReport: {}
		};
	},
	filters: {
		formatDate (row) {
			const startAt = row.startTime;
			const endAt = row.endTime;
			return `${startAt} - ${endAt}`;
		},
		formatBizType (type) {
			return type === 0 ? '业务需求' : '技术需求';
		},
		formatState (state) {
			const stateArr = ['产品规划', '研发规划', '开发中', '待测试', '完成'];
			return stateArr[state];
		},
		formatCc (ccArr) {
			return isArray(ccArr) ? ccArr.join('，') : '';
		}
	},
	computed: {},
	methods: {
		loadData () {
			const { size, current } = this;
			const params = { size, current };
			loadReports(params).then((response) => {
				this.myReports = response.data.records;
				this.total = response.data.total;
			}).catch((err) => {
				this.$message.error(err.message);
			})
		},
		handleDetail (row) {
			this.detailDialogVisible = true;
			this.selecteReport = { ...row };
			console.log(this.selecteReport)
		}
	},
	created () {
		this.loadData();
	},
	watch: {
		size (newVal, oldVal) {
			if (newVal !== oldVal) {
				this.loadData();
			}
		},
		current (newVal, oldVal) {
			if (newVal !== oldVal) {
				this.loadData();
			}
		}
	}
}
</script>
<style type='text/less' lang='less'>
.reports-card {
	padding: 10px 25px;

	.el-table .cell {
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		white-space: nowrap;
		line-height: 23px;
	}

	.daterange-input .el-input__inner {
		border: none;
		border-bottom: 1px solid #ccc;
		border-radius: 0;
	}

	.detail-wrapper {
		padding: 0 50px;
	}
	.detail-lable {
		display: inline-block;
		width: 110px;
		font-weight: 600;
	}
}
</style>