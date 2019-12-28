import {SchemaLike, validate, string, object} from "joi";
import {ErrorModel} from "../model/ErrorModel";
import {errorCode, category} from "../config/ErrorCode";

export const createURIValid: SchemaLike = object().keys({
    url: string().uri().required()
});


export const checkValidation = (target: any, schema: SchemaLike) => {
    const result = validate(target, schema);
    if (result.error) {
        throw new ErrorModel(400, errorCode.fieldValid, category.input, result.error.message);
    }
}
