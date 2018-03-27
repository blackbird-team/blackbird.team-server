import express from "express";
import { createServer, Server } from "http";
import ip from "ip";
import favicon from "serve-favicon";
import Subdomain from "./subdomain";
import {resolve} from "path";
import Middleware from "./middleware";

const PORT: number = 80;
const HOST: string = ip.address();

class HttpServer {
	private app: express.Application = express();
	private server: Server = createServer(this.app);

	public async start(): Promise<void> {
		this.server.on("error", err => {
			global.console.error(err.message);
		});
		await this.server.listen(PORT, HOST);
        this.middleware();

		const message: string = `${new Date()} Server ${HOST} is listening on port ${PORT}`;
		global.console.log(message);
	}

	private middleware() {
		this.app.use(favicon("./public/favicon.ico"));
        this.app.use("/public", express.static("public"));
        this.app.use(Middleware.cors);
        new Subdomain({ app: this.app, name: "tech" });
        new Subdomain({ app: this.app, name: "manufactura" });

        this.app.get("/", (req, res) => {
            res.sendFile(resolve("./public/index.html"));
        });
	}

	public async close(): Promise<void> {
		try {
			// is needed ???????
			await this.server.close();
		} catch (err) {
			global.console.error(err);
		}
	}
}

export default HttpServer;
