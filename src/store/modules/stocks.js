import { dataAccess } from "../../data/stockDataApi";

const state = {
	stocks: []
};

const getters = {
	stocks(state) {
		return state.stocks;
	}
};

const mutations = {
	"SET_STOCKS"(state, stocks) {
		if(stocks) {
			state.stocks = stocks;
		}
	},

	"RND_STOCKS"(state) {
		state.stocks.forEach(stock => {
			const increment = 1 + Math.random() - 0.4;
			stock.price = Math.round(stock.price * increment);
		});
	}
};

const actions = {
	buyStock({ commit }, order) {
		// BUY_STOCK through global namespace refers to portfolio.js
		commit("BUY_STOCK", order);
	},

	loadStocks({ commit }) {

		dataAccess.fetchData()
			.then(response => commit("SET_STOCKS", response.data.stocks))
			.catch(error => console.error("Error loading stocks data: ", error.message));
	},

	randomizeStocks({ commit }) {
		commit("RND_STOCKS");
	}
};

export default {
	state,
	getters,
	mutations,
	actions
};