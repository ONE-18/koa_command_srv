import { BaseRepository } from "./baseRepo";
import { MScript } from "../models";
import type { Script } from "../types/Scripts";

class ScriptRepository extends BaseRepository<Script> {
    constructor() {
        super(MScript);
    }
    
    async findByLanguage(language: string): Promise<Script[]> {
        const list = await this.model.find({ language }).exec();
        return list ? list.map(script => script.toObject() as Script) : [];
    }
}

export const scriptRepository = new ScriptRepository();