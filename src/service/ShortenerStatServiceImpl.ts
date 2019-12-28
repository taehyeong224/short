import {ShortenerStatService} from "./ShortenerStatService";
import {Shorten} from "../entity/Shorten";
import {ShortenStat} from "../entity/ShortenStat";
import {Stat} from "../config/Type";

export class ShortenerStatServiceImpl implements ShortenerStatService {

    public create = (shorten: Shorten): Promise<ShortenStat> => {
        return ShortenStat.create({shorten: shorten}).save()
    };

    public getByShorten = async (shorten: Shorten): Promise<Stat[]> => {
        return ShortenStat.query(`
            SELECT   CONCAT(DATE(visitDate), ' ', HOUR(visitDate), ':00:00') AS 'at',COUNT(*) AS \`visits\`
            FROM     shorten_stat
            WHERE    shortenId = '${shorten.id}' AND visitDate BETWEEN '2019-11-25' AND NOW()
            GROUP BY HOUR(visitDate);
        `)
    }
}
