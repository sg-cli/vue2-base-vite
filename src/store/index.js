import { defineStore } from "pinia";
export const userStore = defineStore("user", {
	state: () => {
		return {
			count: 1,
			arr: ["a", "b", "c"],
		};
	},
	getters: {},
	actions: {},
});
