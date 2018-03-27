import { Router } from "express";
import express from "express";
import { resolve } from "path";

const router: Router = express.Router();

router.get("/test", (req: any, res) => {
    const { subdomain } = req;
    res.send({ subdomain });
});

router.get("*", (req, res) => {
    const index: string = resolve(`./public/itop-content/index.html`);
    res.sendFile(index);
});

export default router;
