import {Shorten} from "../entity/Shorten";
import {ShortenStat} from "../entity/ShortenStat";

export interface ShortenerStatService {
    create(shorten: Shorten): Promise<ShortenStat>;
}
