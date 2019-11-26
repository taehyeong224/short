import {RouterInterface} from "./util/interface";
import {Method} from "./util/enum";
import {ShortenerController} from "./controller/ShortenerController";
import {checkContentType} from "./middleware/contentType";

const shortenerController = new ShortenerController();

export const AppRoutes: RouterInterface[] = [
    {
        path: "/:id",
        method: Method.GET,
        action: shortenerController.getOne
    }
];

