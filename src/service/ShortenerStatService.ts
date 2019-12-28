import {Shorten} from "../entity/Shorten";
import {ShortenStat} from "../entity/ShortenStat";
import {Stat} from "../config/Type";

export interface ShortenerStatService {
    create(shorten: Shorten): Promise<ShortenStat>;
    getByShorten(shorten: Shorten): Promise<Stat[]>
}
