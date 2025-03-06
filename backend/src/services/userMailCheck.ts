import Database from "../utils/database";

class userMailCheck {
    static async checkMail(mail: string) : Promise<boolean> {
        // Check if the mail is already in use
        // If it is, return false
        // If it is not, return true

        if (await Database.getUserByMail(mail)) {
            return true;
        }

        return false;
    }
}

export default userMailCheck;