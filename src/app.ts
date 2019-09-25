import express from "express";
import bodyParser from "body-parser";
import mcache from "memory-cache";
import dotenv from "dotenv";
import fs from "fs";

import * as apiController from "./controllers/api";
import { RequestHandler } from "express-serve-static-core";

if (fs.existsSync(".env")) {
    console.log("Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
}

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var cache = (duration: number, key: string): RequestHandler => (req, res, next) => {
    const cachedBody = mcache.get(key);
    if (cachedBody) {
        return res.json(cachedBody);
    }

    const _json = res.json;
    res.json = (body) => {
        if (body) {
            mcache.put(key, body, duration * 1000);
        }
        return _json.call(res, body);
    };
    return next();
};

app.get("/", cache(parseInt(process.env["CACHE_TIME"]), "/"), apiController.getTitles);

export default app;