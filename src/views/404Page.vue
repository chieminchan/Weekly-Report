<template>
	<div class='not-found'>
		<p class="not-found-img"></p>
		<el-button type="primary">返回上一页</el-button>
	</div>
</template>

<script>

export default {
	components: {},
	data () {
		return {};
	},
	computed: {},
	methods: {},
	mounted () { },
}
</script>
<style type='text/less' lang='less'>
.not-found {
	width: 100%;
	min-height: 700px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #fff;
	flex-direction: column;
}

.not-found-img {
	background-image: url('../assets/img/404.jpg');
	background-size: cover;
	background-position: center;
	background-color: #ccc;
	width: 100%;
	height: 350px;
}
</style>