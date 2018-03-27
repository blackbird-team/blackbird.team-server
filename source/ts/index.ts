import Network from "./network";

class Main {
    public static async init(): Promise<void> {
        await Network.init();
    }
}

Main.init();