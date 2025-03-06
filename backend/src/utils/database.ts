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

    static async getScripts(): Promise<any> {
        return await MScript.find();
    }

    static async getScriptById(id: string): Promise<any> {
        return await MScript.find({ userID: ''}).findById(id);
    }

    static async getUserByMail(email: string): Promise<any> {
        return await MUser.find({ email: email });
    }

    static async checkUser(email: string, password: string): Promise<boolean> {
        return await MUser.exists({ email: email, password: password });
    }
}

export default Database;

