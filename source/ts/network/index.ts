import HttpServer from "./http/httpServer";

class Network {
    private http: HttpServer = new HttpServer();

    public async init(): Promise<void> {
       await this.http.start();
    }

    public async stop(): Promise<void> {
        await this.http.close();
    }
}

export default new Network();