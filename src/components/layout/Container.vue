<template>
	<section class="admin-main">
		<transition name="fade-transform" mode="out-in">
			<router-view></router-view>
		</transition>
	</section>
</template>

<style type='text/less' lang='less'>
.admin-main {
	box-sizing: border-box;
	width: 100%;
	height: 700px;
	padding: 5px 25px;
	overflow-y: auto;
}
</style>