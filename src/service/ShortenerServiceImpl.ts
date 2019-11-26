import {ShortenerService} from "./ShortenerService";
import {Stats, UrlAndDuplicated} from "../config/Type";
import {Shorten} from "../entity/Shorten";
import {generate} from "shortid";
import {throwWhenTargetNotExist} from "../util/ErrorHandle";

export class ShortenerServiceImpl implements ShortenerService {
    public generate = async (url: string): Promise<UrlAndDuplicated> => {
        const shorten = await Shorten.findOne({
            where: {
                originUrl: url
            }
        });
        if (shorten) {
            return {url: shorten.id, duplicated: true}
        }
        const id = await this.generateId();
        const newShorten = await Shorten.create({id, originUrl: url}).save();
        return {url: newShorten.id, duplicated: false};
    };

    public getById = async (id: string): Promise<Shorten> => {
        return Shorten.findOne(id);
    };

    public getOriginUrlById = async (id: string): Promise<string> => {
        const shorten = await this.getById(id);
        throwWhenTargetNotExist({target: shorten});
        return shorten.originUrl;
    };
    
    public getStatsById = async (id: string): Promise<Stats[]> => {
        return [];
    };

    private generateId = async (): Promise<string> => {
        let id = generate();
        while (true) {
            const exist = await this.getById(id);
            if (!exist) {
                break;
            }
            id = generate();
        }
        return id;
    };
}
