import {ShortenerService} from "./ShortenerService";
import {Stat, UrlAndDuplicated} from "../config/Type";
import {Shorten} from "../entity/Shorten";
import {generate} from "shortid";
import {throwWhenTargetNotExist} from "../util/ErrorHandle";
import {ShortenerStatService} from "./ShortenerStatService";
import {ShortenStat} from "../entity/ShortenStat";

export class ShortenerServiceImpl implements ShortenerService {
    private readonly shortenerStatService: ShortenerStatService;

    constructor(shortenerStatService: ShortenerStatService) {
        this.shortenerStatService = shortenerStatService;
    }

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
        this.shortenerStatService.create(shorten); // no await
        return shorten.originUrl;
    };

    public getStatsById = async (id: string): Promise<Stat[]> => {
        const shorten = await this.getById(id);
        throwWhenTargetNotExist({target: shorten});
        return this.shortenerStatService.getByShorten(shorten);
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
