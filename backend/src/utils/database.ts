import mongoose from 'mongoose';
import {MScript, MUser} from '../models';

class Database {
    public constructor() {}

    public async connect(): Promise<void> {
        try {
            const dbUri = 'mongodb://root:randompassword@mongodb/appDev?authSource=admin';
            await mongoose.connect(dbUri);
            console.log('Conectado a MongoDB');
        } catch (err) {
            console.error('Error al conectar:', err);
            throw err;
        }
    }

    public async disconnect(): Promise<void> {
        try {
            await mongoose.connection.close();
            console.log('Desconectado de MongoDB');
        } catch (err) {
            console.error('Error al desconectar:', err);
            throw err;
        }
    }

    static async getUserScripts(userID: string): Promise<typeof MScript[]> {
        const all = await MScript.find();
        console.log('all', all);
        const ret = await MScript.find({ userID: userID}).exec();
        console.log('id', userID);
        console.log('ret', ret);
        return ret;

    }

    static async getUserScriptById(userID:string, id: string): Promise<typeof MScript> {
        return await MScript.find({ userID: userID}).findById(id);
    }

    static async getUserByMail(email: string): Promise<typeof MUser> {
        return await MUser.find({ email: email });
    }

    static async checkUser(email: string, password: string): Promise<boolean> {
        return await MUser.exists({ email: email, password: password });
    }
}

export default Database;

