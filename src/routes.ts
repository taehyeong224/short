import {RouterInterface} from "./util/interface";
import {Method} from "./util/enum";
import {ShortenerController} from "./controller/ShortenerController";
import {ShortenerServiceImpl} from "./service/ShortenerServiceImpl";
import {ShortenerStatServiceImpl} from "./service/ShortenerStatServiceImpl";

const shortenerController = new ShortenerController(new ShortenerServiceImpl(new ShortenerStatServiceImpl()));

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

