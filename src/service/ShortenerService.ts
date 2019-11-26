import {Stats, UrlAndDuplicated} from "../config/Type";
import {Shorten} from "../entity/Shorten";

export interface ShortenerService {
    generate(url: string): Promise<UrlAndDuplicated>
    getById(id: string): Promise<Shorten>
    getStatsById(id: string): Promise<Stats[]>
    getOriginUrlById(id: string): Promise<string>
}
