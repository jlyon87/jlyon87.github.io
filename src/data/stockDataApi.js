import axios from "axios";

export const HTTP = axios.create({
	baseURL: "https://stocktrader-fe299.firebaseio.com/",
	headers: {
		Authorization: "Access-Control-Allow-Origin"
	}
});

export const dataAccess = {
	fetchData() {
		return HTTP.get("data.json");
	},

	saveData({ stocks, funds, portfolio }) {
		return HTTP.put("data.json", {
			stocks,
			funds,
			portfolio
		});
	}
};