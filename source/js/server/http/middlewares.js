import express from "express";
import favicon from 'serve-favicon';

class HttpServerMiddleware {
	app = null;

	constructor(options) {
		this.app = options.app;
	}

	init() {
		this.app.use(favicon("./public/favicon.ico"));

		this.app.use((req, res, next) => {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Credentials", true);
			res.header("Access-Control-Allow-Methods", "GET, POST");
			res.header("Access-Control-Allow-Headers", "Cache-Control");
			next();
		});

		this.app.use("/public", express.static("public"));
	}
}

export default HttpServerMiddleware;