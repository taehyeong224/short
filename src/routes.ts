import {RouterInterface} from "./util/interface";
import {Method} from "./util/enum";
import {ShortenerController} from "./controller/ShortenerController";
import {ShortenerServiceImpl} from "./service/ShortenerServiceImpl";

const shortenerController = new ShortenerController(new ShortenerServiceImpl());

export const AppRoutes: RouterInterface[] = [
    {
        path: "/:id",
        method: Method.GET,
        action: shortenerController.getOne
    },
    {
        path: "/register.json",
        method: Method.POST,
        action: shortenerController.create
    }
];

