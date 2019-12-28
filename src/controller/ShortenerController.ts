import {Request, Response} from "express";
import {BaseController} from "./base/BaseController";
import {checkValidation, createURIValid} from "../util/joi";
import {ShortenerService} from "../service/ShortenerService";
import {Stat, UrlAndDuplicated} from "../config/Type";
import {ErrorHandle} from "../util/ErrorHandle";
import {Log} from "../util/Log";

export class ShortenerController extends BaseController {
    private shortenerService: ShortenerService;

    constructor(shortenerService: ShortenerService) {
        super();
        this.shortenerService = shortenerService;
    }

    public create = async (req: Request, res: Response): Promise<void> => {
        try {
            checkValidation(req.query, createURIValid);
            const {url} = req.query;
            const result: UrlAndDuplicated = await this.shortenerService.generate(url);
            res.status(result.duplicated ? 200 : 201).json({url: result.url});
        } catch (e) {
            Log.error("ShortenerController > create > error : ", e);
            ErrorHandle(req, res, e);
        }
    };

    public getOne = async (req: Request, res: Response): Promise<void> => {
        try {
            const {id} = req.params;
            const originUrl: string = await this.shortenerService.getOriginUrlById(id);
            res.status(301).redirect(originUrl)
        } catch (e) {
            Log.error("ShortenerController > getOne > error : ", e);
            ErrorHandle(req, res, e);
        }
    };

    public getStats = async (req: Request, res: Response): Promise<void> => {
        try {
            const {id} = req.params;
            const stats: Stat[] = await this.shortenerService.getStatsById(id);
            res.status(200).json({Stats: stats});
        } catch (e) {
            Log.error("ShortenerController > getStats > error : ", e);
            ErrorHandle(req, res, e);
        }
    };

    public update = (req: Request, res: Response): void => {
    }
    public delete = (req: Request, res: Response): void => {
    };
}
