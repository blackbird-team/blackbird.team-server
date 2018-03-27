import { IOptions } from "@ltypes/network";
import express, { Router } from "express";
import { resolve } from "path";
import { readFileSync } from "fs";
import subdomain from "express-subdomain";


class Subdomain {
	private app: express.Application;
	private router: Router = express.Router();
	private name: string;

	constructor(options: IOptions) {
		this.app = options.app;
		this.name = options.name;

		this.initGetHandlers();
		this.appendSubdomain();
	}

	private initGetHandlers(): void {
		this.router.get("/md*", this.getMd.bind(this));

		this.router.get("*", (req, res) => {
			const index: string = resolve(`./public/${this.name}/index.html`);
			res.sendFile(index);
		});
	}

	private appendSubdomain(): void {
		this.app.use(subdomain(this.name, this.router));
	}

	private getMd(req: any, res: any): void {
		let mark: string = `404 for GET: ${req.url}`;

		try {
			const file: string = resolve(`./build/${this.name}/${req.url}.md`);
			mark = readFileSync(file, "utf8");
		} catch (e) {
			global.console.log(mark);
		}

		res.json({ message: mark });
	}
}

export default Subdomain;
