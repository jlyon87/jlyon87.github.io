<template>
<v-toolbar app>
	<v-toolbar-items>
		<v-btn flat
			to="/"
			exact
			color="primary">
			Stock Trader
		</v-btn>

		<v-btn flat
			to="/portfolio"
			exact>
			Portfolio
		</v-btn>

		<v-btn flat
			to="/stocks"
			exact>
		Stocks</v-btn>
	</v-toolbar-items>

	<v-spacer></v-spacer>
	<v-toolbar-items>
		<v-btn flat @click="endDay">End Day</v-btn>

		<v-menu >
			<v-btn slot="activator" flat>Save & Load</v-btn>
			<v-list>
				<v-list-tile v-for="item in saveLoadOptions" :key="item.title" @click="item.callback">
					<v-list-tile-title>{{ item.title }}</v-list-tile-title>
				</v-list-tile>
			</v-list>
		</v-menu>
	</v-toolbar-items>

	<v-toolbar-title>
		Funds: {{ funds }}
	</v-toolbar-title>
</v-toolbar>
</template>

<script>
import { dataAccess } from "../data/stockDataApi";

export default {
	data() {
		return {
			saveLoadOptions: [
				{title: "Save Data", callback: () => { this.saveData(); } },
				{title: "Load Data", callback: () => { this.loadData(); } }
			]
		};
	},

	computed: {
		funds() {
			return this.$store.getters.formattedFunds;
		}
	},

	methods: {
		endDay() {
			this.$store.dispatch("randomizeStocks");
		},
		saveData() {
			const data = {
				stocks: this.$store.getters.stocks,
				portfolio: this.$store.getters.portfolio,
				funds: this.$store.getters.funds
			};

			dataAccess.saveData(data)
			.then(response => console.log("Saved"))
			.catch(error => console.error("Error saving data: ", error.message));

			console.log("this.$store.getters.portfolio", this.$store.getters.portfolio);
		},
		loadData() {
			this.$store.dispatch("loadStocks");
			this.$store.dispatch("loadPortfolio");
			this.$store.dispatch("loadFunds");
		}
	}
}
</script>

