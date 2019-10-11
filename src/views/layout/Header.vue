<template>
	<header class="head admin-head">
		<el-menu class="user-info" mode="horizontal" @select="menuSelected">
			<el-submenu index="userAvatar" name="user">
				<template slot="title">
					<el-avatar class="user-avatar">{{userName}}</el-avatar>
				</template>
				<el-menu-item class="logout-btn" index="signOut">退出登录</el-menu-item>
			</el-submenu>
		</el-menu>
	</header>
</template>


<script>
import { mapState, mapActions } from 'vuex';
import { logout } from '@/store/api/user';


export default {
	data () {
		return {
			selected: '',
		};
	},
	computed: {
		...mapState('user', ['userInfo']),
		userName () {
			if (this.userInfo) {
				return this.userInfo.realName.substr(-1);
			}
			return '';
		},
	},
	methods: {
		...mapActions('user', ['loadUserInfo']),
		menuSelected (index) {
			if (index === 'signOut') {
				this.signOut();
			}
		},
		signOut () {
			logout().then(() => {
				this.$router.push({ name: 'login' });
			}).catch((error) => {
				this.$message.error(error.msg);
			});
		},
		getProfile () {
			this.loadUserInfo();
		}
	},
	created () {
		this.getProfile();
	}
};
</script>
<style type='text/less' lang='less'>
.admin-head {
	margin-bottom: 20px;
	width: 100%;
	height: 65px;
	position: relative;
	background: #fff;
	.user-info {
		position: absolute;
		right: 10px;
	}
	.user-avatar {
		margin-right: 10px;
		background: #3a8ee6;
		color: #fff;
	}
}
</style>