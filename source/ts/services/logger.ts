import { appendFile, existsSync } from "fs";
import mkdirp from "mkdirp";
import moment from "moment";

/**
 * @namespace Logger
 * @classdesc Write .log inside root/log/
 */
class Logger {
    /**
     * @static
     * @param data
     * @param processName
     * @returns {Promise<any>}
     */
    public static log(data: string, processName: string | false = false) {
        return new Promise(resolve => {
            Logger.writeLog("log", data, processName).then(resolve);
        });
    }

    /**
     * @static
     * @param data
     * @param processName
     * @returns {Promise<any>}
     */
    public static warn(data: string, processName: string | false = false) {
        return new Promise(resolve => {
            Logger.writeLog("warn", data, processName).then(resolve);
        });
    }

    /**
     * @static
     * @param data
     * @param processName
     * @returns {Promise<any>}
     */
    public static error(data: string, processName: string | false = false) {
        return new Promise(resolve => {
            Logger.writeLog("error", data, processName).then(resolve);
        });
    }

    /**
     * @static
     * @param type
     * @param data
     * @param processName
     * @throws Error from fs.appendFile
     * @returns {Promise<any>}
     */
    protected static async writeLog(
        type: string,
        data: string,
        processName: string | false = false
    ): Promise<any> {
        const d = {
            m: moment().format("MM-YYYY"),
            t: moment().format("DD/MM/YYYY HH:mm:ss")
        };
        const file = `${Logger.parsePath(processName)}/${d.m}/${type}.log`;
        const message = `\r\n ${d.t} ${data}`;

        Logger.checkDir(processName);
        return new Promise(resolve => {
            appendFile(file, message, err => {
                if (err) {
                    throw new Error(`Logger.${type} error: ${err}`);
                }
                resolve();
            });
        });
    }

    /**
     * @static
     * @param processName
     * @throws Conflict in operations with File system
     */
    private static checkDir(processName: string | false = false): void {
        let dir: string = Logger.parsePath(processName);
        dir += `/${moment().format("MM-YYYY")}`;

        try {
            const exists: boolean = existsSync(dir);
            if (!exists) {
                mkdirp.sync(dir);
            }
        } catch (e) {
            throw global.console.log(e);
        }
    }

    /**
     * @static
     * @param processName
     * @returns {string}
     */
    private static parsePath(processName: string | false = false): string {
        return typeof processName === "string" ? `./log/${processName}/` : `./log/`;
    }
}

/**
 * Static class {@link Logger}
 * @exports Logger
 */
export default Logger;
