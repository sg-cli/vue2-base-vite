<template>
	<div class="home">Home</div>
</template>

<script>
import { userStore } from "@/store";
export default {
	name: "view-home",
	data() {
		return {};
	},
	mounted() {
		const { count, arr } = userStore();
		console.log(count, arr, "----store-0000==");
		console.log(import.meta.env, "---e443");
	},
	components: {},
};
</script>

<style scoped lang="less">
.home {
	background: orange;
	user-select: none;
}
</style>
