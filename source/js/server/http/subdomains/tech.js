import express from "express";
import { resolve } from "path";
import { readFileSync } from "fs";
import subdomain from "express-subdomain";

class TechSubdomain {
	app = null;
	router = express.Router();

	constructor(options) {
		this.app = options.app;
	}

	init() {
		this.initGetHandlers();
		this.appendSubdomain();
	}

	initGetHandlers() {
		this.router.get("/md*", TechSubdomain.getMd.bind());

		this.router.get("*", (req, res) => {
			res.sendFile(resolve("./public/tech/index.html"));
		});
	}

	appendSubdomain() {
		this.app.use(subdomain("tech", this.router));
	}

	static getMd(req, res) {
		let mark = `404 for GET: ${req.url}`;

		try {
			mark = readFileSync(resolve(`./build/tech/${req.url}.md`), "utf8");
		} catch (e) {
			global.console.log(mark);
		}

		res.json({ message: mark });
	}
}

export default TechSubdomain;
