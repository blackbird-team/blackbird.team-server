import { IOptions } from "@ltypes/network";
import express, { Router } from "express";
import subdomain from "express-subdomain";
import DefautlRoter from "./routes/default";

class Subdomain {
	private app: express.Application;
	private router: Router;
	private name: string;

	constructor(options: IOptions) {
		this.app = options.app;
		this.name = options.name;
		this.router = options.router || DefautlRoter(this.name);

		this.appendSubdomain();
	}

	private appendSubdomain(): void {
		this.app.use(subdomain(this.name, this.router));
	}
}

export default Subdomain;
