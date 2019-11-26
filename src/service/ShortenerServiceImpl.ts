import {ShortenerService} from "./ShortenerService";
import {Stats, UrlAndDuplicated} from "../config/Type";
import {Shorten} from "../entity/Shorten";
import {generate} from "shortid";

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

    public getById = (id: string): string => {
        return "";
    };

    public getStatsById = (id: string): Stats[] => {
        return [];
    }

    private generateId = async (): Promise<string> => {
        let id = generate();
        while (true) {
            const exist = await Shorten.findOne(id);
            if (!exist) {
                break;
            }
            id = generate();
        }
        return id;
    };
}
