import {describe, it} from "mocha";
import {expect} from "chai";
import * as request from "supertest";
import {startServer} from "../index";

describe("Home", () => {
    let app;

    before("start server", async () => {
        app = await startServer();
    });

    describe("/", () => {
    })
});
