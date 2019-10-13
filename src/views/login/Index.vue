<template>
	<div class="login-page">
		<el-card class="login-card">
			<h2 class="login-title" slot="header">
				<img class="logo-img" src="https://i.loli.net/2019/10/07/bjihn6HuBLzfYXg.png">
				<span class="logo-text">周报系统</span>
			</h2>
			<el-form class="login-form" :model="user" label-position="left" :rules="ruleInline" ref="loginForm">
				<el-form-item class="item" label="UM号" prop="username">
					<el-input class="item-content" type="text" v-model="user.username"></el-input>
				</el-form-item>
				<el-form-item class="item" label="密 码" prop="password">
					<el-input class="item-content" type="password" v-model="user.password"></el-input>
				</el-form-item>
				<el-form-item class="login-btn">
					<el-button type="primary" size="large" :loading="isFetching" @click.prevent="submit" ghost>登 录</el-button>
				</el-form-item>
			</el-form>
		</el-card>
		<div class="bg">
			<LazyloadImg :src="backgroundImg"></LazyloadImg>
		</div>
	</div>
</template>

<script>
import { login } from '@/store/api/user';
import LazyloadImg from '@/components/LazyloadImg';

export default {
	components: { LazyloadImg },
	data () {
		return {
			user: {
				username: '',
				password: ''
			},
			ruleInline: {
				username: [
					{
						required: true,
						message: '请填写有效的UM号.',
						trigger: 'blur'
					}
				],
				password: [
					{
						required: true,
						message: '请填写密码.',
						trigger: 'blur'
					},
					{
						type: 'string',
						min: 6,
						message: '密码必须不能小于6位',
						trigger: 'blur'
					}
				]
			},
			isFetching: false,
			backgroundImg: 'https://i.loli.net/2019/04/23/5cbf0a3fe48e9.png',
		};
	},
	methods: {
		submit () {
			this.$refs.loginForm.validate(isValid => {
				if (isValid) {
					this.userLogin();
				} else {
					this.$message.error('请输入有效的UM号和密码');
				}
			});
		},
		userLogin () {
			this.isFetching = true;
			const { user: { username, password } } = this;

			login({ username, password }).then(() => {
				this.$message.success('登录成功');
				this.isFetching = false;
				this.$router.push({ name: 'home' });
			}).catch(() => {
				this.isFetching = false;
				this.$message.error('登陆失败,请检查账号和密码是否正确！');
			});
		}
	},
};
</script>

<style type='text/less' lang='less'>
@import '~@/css/vars.less';

.login {
	&-page {
		width: 100%;
		height: 100%;
		position: relative;
		background: white;

		.logo-img {
			width: 25px;
			margin-right: 5px;
		}

		.logo-text {
			font-weight: 500;
			font-size: 24px;
		}
	}
	&-card {
		width: 470px;
		border: none;
		position: absolute;
		top: 32%;
		left: 50%;
		z-index: 2;
		transform: translate(-50%, -50%);

		.el-card__header {
			border-bottom: none;
			padding: 0;
		}
		.el-card__body {
			padding: 0 50px;
		}

		.el-form-item__content {
			margin-bottom: 15px;
		}
	}
	&-title {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20px 0;
	}

	&-btn {
		text-align: center;
		button {
			padding: 10px 80px;
			font-size: 16px;
			font-weight: 400;
		}
	}
}
.login-form {
	.item-content {
		width: 80%;
	}
}
.bg {
	width: 100%;
	text-align: center;
	position: absolute;
	bottom: 0;
}
</style>