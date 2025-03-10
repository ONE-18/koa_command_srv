import Database from "../utils/database";

export class userScripts {
    static async getAllScripts(userID: string) {
        return await Database.getUserScripts(userID);
    }

    static async getScriptById(userID: string, id: string) {
        return await Database.getUserScriptById(userID, id);
    }
}