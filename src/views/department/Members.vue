<template>
	<el-card class='members-card'>
		<h3 class="card-header" slot="header">部门组员</h3>
		<div class="actions-row">
			<span class="select-lable">部门：
				<el-select class="dept-selection" v-model="selectedDept" placeholder="请选择部门" filterable :disabled="isDeptManager">
					<el-option v-for="item in deptOpt" :key="item.id" :label="item.deptDesc" :value="item.id">
					</el-option>
				</el-select>
			</span>

			<el-button type="primary" size="small" plain>增加</el-button>
		</div>
		<el-table class="reports-table" :data="members">
			<el-table-column label="UM号" prop="username" align="center"></el-table-column>
			<el-table-column label="姓名" prop="realName" align="center"></el-table-column>
			<el-table-column label="部门" prop="deptDesc" align="center" width="180"></el-table-column>
			<el-table-column label="邮箱" prop="email" align="center"></el-table-column>
			<el-table-column label="手机号码" prop="mobile" align="center"></el-table-column>
			<el-table-column label="角色" prop="roleId" align="center">
				<template slot-scope="scope">
					{{scope.row.roleId | formatRole}}
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-button @click="showEditDialog(scope.row)" type="primary" size="small" plain>编辑</el-button>
					<el-button @click="handleRemove(scope.row.username)" type="danger" size="small" plain>删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination class="pagination-row" :page-sizes="[5, 10, 15, 20]" :current-page.sync="current" :page-size.sync="size" layout="sizes, prev, pager, next" :total="total"></el-pagination>

		<el-dialog ref="editDialog" title="编辑组员信息" :visible.sync="editDialgVisible" width="600px">
			<el-form class="edit-form" :model="selectedMember" label-width="80px" label-position="left">
				<el-form-item label="UM 号" prop="username" required>
					<el-input v-model="selectedMember.username" disabled></el-input>
				</el-form-item>
				<el-form-item label="姓 名" prop="realName" required>
					<el-input v-model="selectedMember.realName" disabled></el-input>
				</el-form-item>
				<el-form-item label="部 门" prop="deptDesc" required>
					<el-input v-model="selectedMember.deptDesc" disabled></el-input>
				</el-form-item>
				<el-form-item label="角 色" prop="roleId" required>
					<el-select class="dept-selection" v-model="selectedMember.roleId" :disabled="!isRoot">
						<el-option v-for="item in roleOpt" :key="item.id" :label="item.desc" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="邮 箱" prop="email" required>
					<el-input v-model="selectedMember.email"></el-input>
				</el-form-item>
				<el-form-item label="手机号码" prop="mobile" required>
					<el-input v-model="selectedMember.mobile"></el-input>
				</el-form-item>
			</el-form>
			<p slot="footer" class="submit-btns">
				<el-button>取 消</el-button>
				<el-button type="primary" @click="handleEdit">确 定</el-button>
			</p>
		</el-dialog>
	</el-card>
</template>

<script>
import { mapState } from 'vuex';
import { loadDeptMembers, loadDepts, removeDeptMember, addDeptMember, editDeptMember } from '@/store/api/department';

export default {
	components: {},
	data () {
		return {
			current: 1,
			size: 10,
			total: 10,
			deptOpt: [],
			members: [],
			selectedDept: undefined,
			editDialgVisible: false,
			selectedMember: {},
			roleOpt: [
				{
					id: 2,
					desc: '部门经理'
				},
				{
					id: 3,
					desc: '普通组员'
				},
			]
		};
	},
	filters: {
		formatRole (role) {
			return role === 2 ? '部门经理' : '普通组员';
		}
	},
	computed: {
		...mapState('user', ['userInfo']),
		isDeptManager () {
			if (this.userInfo.roleId) {
				return this.userInfo.roleId === 2;
			}
			return false;
		},
		isRoot () {
			if (this.userInfo.roleId) {
				return this.userInfo.roleId === 1;
			}
			return false;
		},
	},
	methods: {
		loadData () {
			const { size, current } = this;
			const params = { size, current, deptId: this.selectedDept };

			loadDeptMembers(params).then((response) => {
				const { total, records } = response.data;
				this.total = total;
				this.members = records;
			}).catch((error) => {
				this.$message.error(error.message);
			})
		},
		loadDeptList () {
			loadDepts().then((response) => {
				this.deptOpt = response.data.records;

				if (this.isDeptManager) {
					this.selectedDept = this.userInfo.deptId;
				} else {
					this.selectedDept = '';
				}

			})
		},
		showEditDialog (row) {
			this.selectedMember = Object.assign({}, row);
			this.editDialgVisible = true;
		},
		handleEdit () {
			const params = { ...this.selectedMember };
			editDeptMember(params).then(() => {
				this.$message.success('编辑成功');
				this.editDialgVisible = false;
				this.loadData();
			})
		},
		handleRemove (username) {
			removeDeptMember({ username }).then(() => {
				this.$message.success('删除成功');
				this.loadData();
			})
		}
	},
	created () {
		this.loadDeptList();
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
		},
		selectedDept (newVal, oldVal) {
			if (newVal !== oldVal) {
				this.loadData();
			}
		}
	}
}
</script>
<style type='text/less' lang='less'>
.members-card {
	.dept-selection {
		width: 300px;
		margin-right: 20px;
		margin-bottom: 20px;
	}

	.edit-form {
		padding: 0 30px;
	}
}
</style>