<template>
<v-container grid-list-lg>
<v-layout row wrap justify-center>
	<v-flex xs12 sm3 v-if="stocks.length > 0" v-for="stock in stocks" :key="stock.name" >
		<app-stock :stock="stock" ></app-stock>
	</v-flex>

	<v-subheader v-if="stocks.length === 0" >No Stocks here. Go buy some on the Stocks page.</v-subheader>
</v-layout>
</v-container>
</template>

<script>
import Stock from "./Stock.vue";

export default {

	computed: {
		stocks() {
			return this.$store.getters.stockPortfolio;
		}
	},

	components: {
		appStock: Stock
	}
}
</script>

