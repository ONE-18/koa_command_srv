import { BaseRepository } from "./baseRepo";
import { MScript } from "../models";
import type { Script } from "../types/Scripts";

class ScriptRepository extends BaseRepository<Script> {
    constructor() {
        super(MScript);
    }
    
    async findByLanguage(language: string): Promise<Script[]> {
        return this.model.find({ language }).exec();
    }
}

export const scriptRepository = new ScriptRepository();