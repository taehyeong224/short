import {RouterInterface} from "./util/interface";
import {Method} from "./util/enum";
import {ShortenerController} from "./controller/ShortenerController";
import {ShortenerServiceImpl} from "./service/ShortenerServiceImpl";
import {ShortenerStatServiceImpl} from "./service/ShortenerStatServiceImpl";
import {HomeController} from "./controller/HomeController";

const shortenerController = new ShortenerController(new ShortenerServiceImpl(new ShortenerStatServiceImpl()));
const homeController = new HomeController();

export const AppRoutes: RouterInterface[] = [
    {
      path: "/",
      method: Method.GET,
      action: homeController.home
    },
    {
        path: "/:id",
        method: Method.GET,
        action: shortenerController.getOne
    },
    {
        path: "/register.json",
        method: Method.POST,
        action: shortenerController.create
    },
    {
        path: "/:id/stats",
        method: Method.GET,
        action: shortenerController.getStats
    }
];

