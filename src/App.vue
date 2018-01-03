<template>
<v-app dark>
	<v-content>
		<app-header></app-header>

		<transition name="slide-y-reverse-transition" mode="out-in">
			<router-view ></router-view>
		</transition>

	</v-content>
</v-app>
</template>

<script>
import Header from "./components/Header.vue";

export default {
	components: {
		appHeader: Header
	},

	created() {
		this.$store.dispatch("loadStocks");
	}
}
</script>

<style>
</style>
