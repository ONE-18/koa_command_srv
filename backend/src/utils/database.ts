import mongoose from 'mongoose';
import {MEndpoint, MScript, MUser} from '../models';

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

    static async update<T extends mongoose.Models>(model: mongoose.Model<T>, obj: T): Promise<T | null> {
        try {
            // console.log('Actualizando documento:', obj);
            // console.log('tipo:', model );
            return await model.findByIdAndUpdate(obj._id, obj , { new: true }).exec();
        } catch (err) {
            console.error('Error al actualizar el documento:', err);
            throw err;
        }
    }

    static async delete<T extends mongoose.Models>(model: mongoose.Model<T>, obj: T): Promise<T | null> {
        try {
            // console.log('Eliminando documento:', obj);
            return await model.findByIdAndDelete(obj._id).exec();
        } catch (err) {
            console.error('Error al eliminar el documento:', err);
            throw err;
        }
    }


    static async getUserScripts(userID: string): Promise<typeof MScript[]> {
        return await MScript.find({ userId: userID}).exec();
    }

    static async getUserScriptById(userID:string, id: string): Promise<typeof MScript> {
        // return await MScript.find({ userId: userID}).findById(id).exec();
        const scripts = await this.getUserScripts(userID);
        return scripts.find(script => script._id.equals(id));    
    }

    static async getUserByMail(email: string): Promise<typeof MUser> {
        return await MUser.find({ email: email });
    }

    static async checkUser(email: string, password: string): Promise<boolean> {
        return await MUser.exists({ email: email, password: password });
    }

    static async getEndpoints(): Promise<typeof MEndpoint[]> {
        return await MEndpoint.find().exec();
    }

    static async getEndpoint(id: string): Promise<typeof MEndpoint> {
        return await MEndpoint.findById(id).exec();
    }

}

export default Database;

