import {Request, Response} from "express";
import {BaseController} from "./base/BaseController";

export class ShortenerController extends BaseController {
    constructor() {
        super();
    }

    create(req: Request, res: Response): void {
    }

    delete(req: Request, res: Response): void {
    }

    getOne(req: Request, res: Response): void {
        res.status(200).json({msg: "hello"})
    }

    update(req: Request, res: Response): void {
    }
}
