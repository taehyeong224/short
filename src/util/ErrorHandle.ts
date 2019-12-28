import {Request, Response} from "express";
import {ErrorModel} from "../model/ErrorModel";
import {category, errorCode} from "../config/ErrorCode";

export const ErrorHandle = (req: Request, res: Response, e: any): Response => {
    if (e instanceof ErrorModel) {
        return res.status(e["status"]).json(e);
    } else {
        return res.status(500).json(new ErrorModel(500, errorCode.unknown, category.unknown, "server error"));
    }
};

export const throwErrorModel = (error: ErrorModel): void => {
    throw error;
};

export const throwWhenTargetExist = ({target, message = undefined}): void => {
    if (target) {
        throwErrorModel(new ErrorModel(400, errorCode.duplicated, category.contentPolicy, message === undefined ? "target is exist" : message));
    }
};

export const throwWhenTargetNotExist = ({target, message = undefined}): void => {
    if (!target) {
        throwErrorModel(new ErrorModel(404, errorCode.notFound, category.input, message === undefined ? "target is not exist" : message));
    }
};