import { IMiddleware } from "@ltypes/network";
import { split } from "lodash";

enum HostPart {
    SUB,
    HOSTPART,
    HOSTPART_WITH_PORT
}

const Middleware: IMiddleware = {
	cors: (req: any, res: any, next: any) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Credentials", true);
		res.header("Access-Control-Allow-Methods", "GET, POST");
		res.header("Access-Control-Allow-Headers", "Cache-Control");
		next();
	},
    subdomain: (req: any, res: any, next: any) => {
        const uri: string[] = split(req.get("host"), `.`);
        if (uri.length === 3) {
            const subdomain: string = uri[HostPart.SUB];
            req.subdomain = subdomain;
        }
        next();
    }
}

export default Middleware;
