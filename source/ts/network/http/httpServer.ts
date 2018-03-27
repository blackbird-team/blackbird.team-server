import express from "express";
import { createServer, Server } from "http";

const PORT: number = 3000;

class HttpServer {
	private app: express.Application = express();
	private server: Server = createServer(this.app);

	public async start(): Promise<void> {
        this.server.on("error", (err) => {
            global.console.error(err.message);
        })
        await this.server.listen(PORT);
        global.console.log(`Server is established on port ${PORT}`);
    }

	public async close(): Promise<void> {
        try { // is needed ???????
            await this.server.close();
        } catch(err) {
            global.console.error(err);
        }
    }
}

export default HttpServer;
