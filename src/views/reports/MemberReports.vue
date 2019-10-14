<template>
	<el-card class="reports-card">
		<h3 class="card-header" slot="header">组员周报</h3>
		<div class="filter">
			<p class="filter-item">
				周报日期:
				<el-date-picker type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
				</el-date-picker>
			</p>
			<p class="filter-item">
				组员姓名:
				<el-input placeholder="组员姓名"></el-input>
			</p>
			<el-button type="primary" size="small">查询</el-button>
		</div>
		<el-table class="reports-table" :data="myReports">
			<el-table-column label="组员姓名" sortable align="center">
				<template slot-scope="scope">{{ scope.row.realName }}</template>
			</el-table-column>
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
			<el-table-column label="备注说明" prop="remark" align="center"></el-table-column>
			<el-table-column label="操作" width="150">
				<template>
					<el-button size="small" type="primary" plain>详情</el-button>
					<el-button size="small" type="success" plain>导出</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-pagination class="pagination-row" :page-sizes="[5, 10, 15, 20]" :current-page.sync="current" :page-size.sync="size" layout="sizes, prev, pager, next" :total="total">
		</el-pagination>

	</el-card>
</template>

<script>
import { loadCcReports } from '@/store/api/reports';

export default {
	data () {
		return {
			total: 100,
			size: 10,
			current: 1,
			myReports: []
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
	},
	computed: {},
	methods: {
		loadData () {
			const { size, current } = this;
			const params = { size, current };
			loadCcReports(params).then((response) => {
				this.myReports = response.data.records;
				this.total = response.data.total;
			}).catch((err) => {
				this.$message.error(err.message);
			})
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

	.filter {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.filter-item {
		margin-right: 30px;
		.el-input {
			width: auto;
		}
	}
}
</style>