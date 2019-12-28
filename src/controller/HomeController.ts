import {BaseController} from "./base/BaseController";
import {Request, Response} from "express";

export class HomeController {
    home = (req: Request, res: Response): void => {
        res.status(200).json({msg: "success"});
    }
}
