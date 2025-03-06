import Database from "../utils/database";

class userPasswCheck {
    static async checkPassw(mail: string, password: string) : Promise<boolean> {

        if (await Database.checkUser(mail, password)) {
            return true;
        }

        return false;
    }
}

export default userPasswCheck;