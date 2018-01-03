import Home from "./components/Home.vue";
import Portfolio from "./components/portfolio/Portfolio.vue";
import Stocks from "./components/stocks/Stocks.vue";

export const routes = [
	{
		path: "/",
		name: "home",
		components: {
			default: Home,
		}
	},
	{
		path: "/portfolio",
		name: "portfolio",
		components: {
			default: Portfolio,
		}
	},
	{
		path: "/Stocks",
		name: "stocks",
		components: {
			default: Stocks
		}
	},
	{
		path: "*",
		redirect: "/"
	}
];