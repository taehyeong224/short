import {Stats, UrlAndDuplicated} from "../config/Type";

export interface ShortenerService {
    generate(url: string): UrlAndDuplicated
    getById(id: string): string
    getStatsById(id: string): Stats[]
}
