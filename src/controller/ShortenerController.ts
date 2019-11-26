import {Request, Response} from "express";
import {BaseController} from "./base/BaseController";
import {checkValidation, createURIValid} from "../util/joi";
import {ShortenerService} from "../service/ShortenerService";
import {UrlAndDuplicated} from "../config/Type";
import {ErrorHandle} from "../util/ErrorHandle";
import {Log} from "../util/Log";

export class ShortenerController extends BaseController {
    private shortenerService: ShortenerService;

    constructor(shortenerService: ShortenerService) {
        super();
        this.shortenerService = shortenerService;
    }

    public create = (req: Request, res: Response): void => {
        try {
            checkValidation(req.query, createURIValid);
            const {url} = req.query;
            const result: UrlAndDuplicated = this.shortenerService.generate(url);
            res.status(result.duplicated ? 200 : 201).json({url: result.url});
        } catch (e) {
            Log.error("ShortenerController > error : ", e);
            ErrorHandle(req, res, e);
        }
    };

    public delete = (req: Request, res: Response): void => {
    };

    public getOne = (req: Request, res: Response): void => {
        res.status(200).json({msg: "hello"})
    };

    public update = (req: Request, res: Response): void => {
    }
}
