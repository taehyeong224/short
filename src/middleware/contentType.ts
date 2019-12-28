import {NextFunction, Request, Response} from "express";
import {category, errorCode} from "../config/ErrorCode";
import {Log} from "../util/Log";

export const checkContentType = (req: Request, res: Response, next: NextFunction) => {
    const contype = req.headers['content-type'];
    if (!contype || contype.indexOf('application/json') !== 0) {
        Log.info("application/json undefined");
        return res.status(400).json({
            message: "content-type is not application/json",
            code: errorCode.fieldValid,
            category: category.input
        });
    }
    next();
};