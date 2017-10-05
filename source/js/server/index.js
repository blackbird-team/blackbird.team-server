import HttpServer from "./http";

class Server {
	http = new HttpServer;

	async init() {
		await this.http.init();
	}
}

export default Server;