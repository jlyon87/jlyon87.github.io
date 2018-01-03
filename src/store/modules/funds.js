import { dataAccess } from "../../data/stockDataApi";

const state = {
	funds: 1000
};

const getters = {
	funds(state) {
		return state.funds;
	},

	formattedFunds(state) {
		return "$" + state.funds.toFixed(2);
	}
};

const mutations = {
	"SET_FUNDS"(state, amount) {
		if(amount) {
			state.funds = amount;
		}
	}
};

const actions = {
	increment({ commit }, amount) {
		commit("SET_FUNDS", state.funds + amount);
	},

	decrement({ commit }, amount) {
		commit("SET_FUNDS", state.funds - amount);
	},

	loadFunds({ commit }) {
		dataAccess.fetchData()
			.then(response => commit("SET_FUNDS", response.data.funds))
			.catch(error => console.error("Error retrieving funds data: ", error.message));
	}
};

export default {
	state,
	getters,
	mutations,
	actions
};