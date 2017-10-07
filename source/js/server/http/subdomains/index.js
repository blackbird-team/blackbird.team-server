import express from "express";
import { resolve } from "path";
import { readFileSync } from "fs";
import subdomain from "express-subdomain";

class Subdomain {
	app = null;
	router = express.Router();
	name = null;
	constructor(options) {
		this.app = options.app;
		this.name = options.name;
	}

	init() {
		if(this.name == null) return;
		this.initGetHandlers();
		this.appendSubdomain();
	}

	initGetHandlers() {
		this.router.get("/md*", this.getMd.bind(this));

		this.router.get("*", (req, res) => {
			res.sendFile(resolve(`./public/${this.name}/index.html`));
		});
	}

	appendSubdomain() {
		this.app.use(subdomain(this.name, this.router));
	}

	getMd(req, res) {
		let mark = `404 for GET: ${req.url}`;

		try {
			mark = readFileSync(resolve(`./build/${this.name}/${req.url}.md`), "utf8");
		} catch (e) {
			global.console.log(mark);
		}

		res.json({ message: mark });
	}
}

export default Subdomain;
