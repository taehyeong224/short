import {Request, Response} from "express";
import {CrudInterface} from "./CrudInterface";

export abstract class BaseController implements CrudInterface{
    abstract create(req: Request, res: Response): void;
    abstract update(req: Request, res: Response): void;
    abstract getOne(req: Request, res: Response): void;
    abstract delete(req: Request, res: Response): void;
}
