<template>
	<v-card class="text-xs-center">
		<v-card-title>{{ stock.name }}</v-card-title>
		<v-card-text>
			<p>Price: {{ stock.price }}</p>
		</v-card-text>
		<v-card-actions>
			<v-text-field
				label="Quantity"
				type="number"
				required
				:rules="[
					() => quantity >= 0 || 'Quantity must be greater than zero.',
					() => !insufficientFunds || 'Insufficient funds.']"
				v-model.number="quantity"
				ref="quantity" ></v-text-field>

			<v-btn flat color="green"
				@click="buyStock"
				:disabled="quantity === '' || quantity * stock.price > funds" >Buy</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	data() {
		return {
			quantity: 0
		};
	},

	props: {
		stock: {
			type: Object,
			required: true
		}
	},

	computed: {
		funds() {
			return this.$store.getters.funds;
		},

		insufficientFunds() {
			return this.funds < this.quantity * this.stock.price;
		}
	},

	methods: {
		buyStock() {
			const order = {
				stockId: this.stock.id,
				quantity: this.quantity,
				price: this.stock.price
			};

			this.$store.dispatch("buyStock", order);
			this.$store.dispatch("decrement", order.quantity * order.price);
			this.quantity = 0;
		}
	}
}
</script>

