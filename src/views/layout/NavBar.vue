<template>
	<section class='admin-nav'>
		<h2 class="menu-collapse" name="menu-collapse">
			<img class="logo-img" src="https://i.loli.net/2019/10/07/bjihn6HuBLzfYXg.png">
			<span class="logo-text">周报系统</span>
		</h2>
		<el-menu class='nav' :default-active="activeItem" background-color="#505765" text-color="white" active-text-color="#409EFF">
			<template v-for="(item, index) in menu">
				<template v-if="item.hasOwnProperty('children')">
					<el-submenu :index="item.name" :key="index">
						<template slot="title">
							<i class="icon" :class="item.icon"></i>
							<span class="menu-item-text"> {{item.title}}</span>
						</template>
						<template v-for="(child, index) in item.children">
							<router-link :to="child.to" :key="index">
								<el-menuItem class="sub-item" :index="child.name">
									{{child.title}}
								</el-menuItem>
							</router-link>
						</template>
					</el-submenu>
				</template>
				<template v-else>
					<router-link :to="item.to" :key="index">
						<el-menu-item :index="item.name">
							<i class="icon" :class="item.icon"></i>
							{{item.title}}
						</el-menu-item>
					</router-link>
				</template>
			</template>
		</el-menu>
	</section>

</template>

<script>
import navData from '@/const/adminNav';

export default {

	computed: {
		menu () {
			return navData;
		},
		openItem () {
			// const { menu } = this;
			// return _.map(menu, (item, name) => item.name);
			return ['admin-activity'];
		},
		activeItem () {
			const routePath = this.$route.path;
			return routePath.split('/')[1];
		}
	}
}
</script>

<style type='text/less' lang='less'>
.admin-nav {
	width: 210px;
}
.nav {
	width: 210px;
	border: none;
	min-height: 730px;
	font-size: 14px;
	& .icon {
		color: white;
		margin-right: 5px;
	}
}
.menu-collapse {
	height: 65px;
	background: #505765;
	color: #ffffff;
	display: flex;
	justify-content: center;
	align-items: center;
}
.logo {
	&-img {
		width: 25px;
		margin-right: 10px;
	}

	&-text {
		display: inline-block;
		font-size: 22px;
	}
}
</style>