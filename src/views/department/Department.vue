<template>
	<el-card class='dept-card'>
		<h3 class="card-header" slot="header">部门管理</h3>
		<div class="actions-row">
			<span class="select-lable">部门：
				<el-input class="dept-selection" placeholder="部门名称">
				</el-input>
			</span>

			<el-button type="primary" size="small">查询</el-button>

			<el-button type="primary" size="small" plain>增加部门</el-button>
		</div>
		<el-table class="reports-table" :data="depts">
			<el-table-column label="部门名称" prop="deptDesc" align="center" width="180"></el-table-column>
			<el-table-column label="创建时间" prop="createTime" align="center"></el-table-column>
			<el-table-column label="更新时间" prop="updateTime" align="center"></el-table-column>
			<el-table-column label="操作" align="center">
				<template>
					<el-button type="primary" size="small" plain>编辑</el-button>
					<el-button type="danger" size="small" plain>删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination class="pagination-row" :page-sizes="[5, 10, 15, 20]" :current-page.sync="current" :page-size.sync="size" layout="sizes, prev, pager, next" :total="total"></el-pagination>
	</el-card>
</template>

<script>
import { loadDepts } from '@/store/api/department';

export default {
	components: {},
	data () {
		return {
			total: 10,
			size: 10,
			current: 1,
			depts: []
		};
	},
	computed: {},
	methods: {
		loadData () {
			loadDepts().then(response => {
				this.depts = response.data.records;
			})
		}
	},
	mounted () {
		this.loadData();
	},
}
</script>
<style type='text/less' lang='less'>
</style>