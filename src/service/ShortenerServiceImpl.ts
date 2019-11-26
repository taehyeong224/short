import {ShortenerService} from "./ShortenerService";
import {Stats, UrlAndDuplicated} from "../config/Type";

export class ShortenerServiceImpl implements ShortenerService {
    public generate = (url: string): UrlAndDuplicated => {
        return {url: "hello", duplicated: false};
    };

    public getById = (id: string): string => {
        return "";
    };

    public getStatsById = (id: string): Stats[] => {
        return [];
    }

}
