<template>
	<div class='img-wrapper'>
		<p class="img-contain"></p>
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
.img-wrapper {
	width: 100%;
	min-height: 700px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.img-contain {
	background-image: url('../assets/img/403.jpg');
	background-size: cover;
	background-position: center;
	background-color: #ccc;
	width: 100%;
	height: 650px;
}
</style>