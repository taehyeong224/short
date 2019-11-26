import {Stats, UrlAndDuplicated} from "../config/Type";

export interface ShortenerService {
    generate(url: string): Promise<UrlAndDuplicated>
    getById(id: string): string
    getStatsById(id: string): Stats[]
}
