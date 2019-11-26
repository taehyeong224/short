import * as express from 'express';
import {Request, Response} from 'express';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as errorHandler from "errorhandler";
import * as http from 'http';
import {AppRoutes} from "./routes";
import * as cors from 'cors';
import {Log} from "./util/Log";
import * as morgan from "morgan";


const app: any = express();
const server: http.Server = http.createServer(app);
const port = process.env.PORT || 3000;

export async function startServer(): Promise<express.Application> {
    try {
        setMiddleWares();
        registerAPI();
        if (process.env.NODE_ENV !== "test") {
            server.listen(port);
        }
        return app;
    } catch (error) {
        throw error;
    }
}

export function stopServer() {
    server.close(async () => {
        Log.info("server", {msg: "Express Server Closed"});
    });
}

function setMiddleWares() {
    app.use(cors({origin: true}));
    app.use(errorHandler());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(cookieParser());
    app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
        err.status = 404;
        next(err);
    });
    if (process.env.NODE_ENV !== "test") {
        app.use(morgan('dev'))
    }
}

// register all application routes
function registerAPI() {
    AppRoutes.forEach((route) => {
        if (route.middleware) {
            app[route.method](route.path, [...route.middleware], async (request: Request, response: Response, next: Function) => {
                try {
                    await route.action(request, response);
                    return next()
                } catch (e) {
                    console.error(e);
                    return next(e);
                }
            });
        } else {
            app[route.method](route.path, async (request: Request, response: Response, next: Function) => {
                try {
                    await route.action(request, response);
                    return next()
                } catch (e) {
                    console.error(e);
                    return next(e);
                }

            });
        }
    });
}

if (require.main === module) {
    startServer().then(() => {
        Log.info(`server start.. listen ${port}`);
    }).catch((error) => Log.error(error));
}
