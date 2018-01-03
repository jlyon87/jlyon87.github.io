import { dataAccess } from "../../data/stockDataApi";

const state = {
	stocks: []
};

const getters = {
	portfolio(state) {
		return state.stocks;
	},

	stockPortfolio(state, getters) {
		return state.stocks.map(stock => {
			const record = getters.stocks.find(row => row.id === stock.id);
			return {
				name: record.name,
				id: record.id,
				quantity: stock.quantity,
				price: record.price
			}
		});
	},
};

const mutations = {
	"SET_PORTFOLIO"(state, portfolio) {
		if(portfolio) {
			state.stocks = portfolio;
		}
	},

	"BUY_STOCK"(state, { stockId, quantity }) {
		// if has record, increment qty
		// else create new record
		const record = state.stocks.find(stock => stock.id === stockId);
		if(record) {
			record.quantity += quantity;
		} else {
			state.stocks.push({
				id: stockId,
				quantity: quantity
			});
		}
	},

	"SELL_STOCK"(state, { stockId, quantity }) {
		// if qty is still > 0, decrement
		// else remove record
		const record = state.stocks.find(stock => stock.id === stockId);
		if(record.quantity > quantity) {
			record.quantity -= quantity;
		} else {
			state.stocks.splice(state.stocks.indexOf(record), 1);
		}
	},
};

const actions = {
	sellStock({ commit }, order) {
		commit("SELL_STOCK", order);
	},

	loadPortfolio({ commit }) {
		dataAccess.fetchData()
			.then(response => commit("SET_PORTFOLIO", response.data.portfolio))
			.catch(error => console.error("Error loading portfolio data: ", error.message));
	}
};

export default {
	state,
	getters,
	mutations,
	actions
};