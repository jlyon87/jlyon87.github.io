<template>
	<v-card class="text-xs-center">
		<v-card-title>{{ stock.name }} ({{ stock.quantity }})</v-card-title>
		<v-card-text>
			<p>Quantity: {{ stock.quantity }}</p>
			<p>Price: {{ stock.price }}</p>
		</v-card-text>
		<v-card-actions>
			<v-text-field
				label="Quantity"
				type="number"
				required
				:rules="[
					() => quantity <= stock.quantity || 'You may not sell more than you have.',
					() => quantity >= 0 || 'Quantity must be greater than zero.']"
				v-model.number="quantity"
				ref="quantity" ></v-text-field>

			<v-btn flat color="red"
				@click="submitSell"
				:disabled="quantity === '' || quantity > stock.quantity" >Sell</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import { mapActions } from "vuex"; // overkill
export default {
	data() {
		return {
			quantity: 0
		};
	},

	props: {
		stock: {
			type: Object,
			required: true,
		}
	},

	computed: {

	},

	methods: {
		...mapActions([
			"sellStock",
			"increment"
		]),

		submitSell() {
			const order = {
				stockId: this.stock.id,
				quantity: this.quantity,
				price: this.stock.price
			}

			this.sellStock(order);
			this.increment(order.quantity * order.price);
			this.quantity = 0;
		}
	}
}
</script>