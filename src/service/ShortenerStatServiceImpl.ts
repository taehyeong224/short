import {ShortenerStatService} from "./ShortenerStatService";
import {Shorten} from "../entity/Shorten";
import {ShortenStat} from "../entity/ShortenStat";

export class ShortenerStatServiceImpl implements ShortenerStatService {

    public create = (shorten: Shorten): Promise<ShortenStat> => {
        return ShortenStat.create({shorten: shorten}).save()
    };
}
