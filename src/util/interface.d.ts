import {Method} from "./enum";

interface RouterInterface {
    path: string,
    method: Method,
    action: Function,
    middleware?: Function[]
}
