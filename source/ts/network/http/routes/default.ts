import { Router } from "express";
import express from "express";
import { resolve } from "path";
import { readFileSync } from "fs";
import Logger from "srv/services/logger";

const router: Router = express.Router();

const getRouter = (name: string): Router => {
    router.get("/md*", (req: any, res: any): void => {
        let mark: string = `404 for GET: ${req.url}`;

        try {
            const file: string = resolve(`./build/${name}/${req.url}.md`);
            mark = readFileSync(file, "utf8");
        } catch (e) {
            Logger.error(mark);
        }

        res.json({ message: mark });
    });

    router.get("*", (req, res) => {
        const index: string = resolve(`./public/${name}/index.html`);
        res.sendFile(index);
    });

    return router;
}

export default getRouter;
