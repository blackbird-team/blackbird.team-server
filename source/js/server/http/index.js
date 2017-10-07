import { createServer } from "http";
import express from "express";
import { resolve } from "path";
import Config from "@/config.default";
import HttpServerMiddleware from "./middlewares";
import Subdomain from "./subdomains";

class HttpServer {
	app = express();
	server = createServer(this.app);
	subdomain = {
		tech: new Subdomain({ app: this.app, name: "tech" }),
		manufactura: new Subdomain({ app: this.app, name: "manufactura" })
	};
	middlewares = new HttpServerMiddleware({ app: this.app });

	init() {
		return new Promise((resolve, reject) => {
			this.initMiddlewares();
			this.initSubdomains();
			this.initGetHandlers();

			this.start()
				.then(resolve)
				.catch(reject);
		});
	}

	start() {
		const done = `${new Date()} Server ${Config.host} is listening on port ${Config.port}`;

		return new Promise((resolve, reject) => {
			try {
				this.server.listen(Config.port, Config.host, () => {
					global.console.log(done);
					resolve();
				});
			} catch (e) {
				reject(e);
			}
		});
	}

	initMiddlewares() {
		this.middlewares.init();
	}

	initSubdomains() {
		this.subdomain.tech.init();
		this.subdomain.manufactura.init();
	}

	initGetHandlers() {
		// this.app.get("/favicon.ico", (req, res) => res.sendStatus(204));

		this.app.get("/", (req, res) => {
			res.sendFile(resolve("./public/index.html"));
		});
	}
}

export default HttpServer;
