<template>
	<div>
		<nav class="nav">
			<router-link to="/">Home</router-link>
			<router-link to="/about">About</router-link>
		</nav>
		<router-view />
	</div>
</template>
<style scoped>
.nav > a {
	margin-right: 10px;
	font-size: 18px;
}
</style>
