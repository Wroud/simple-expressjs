"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const memory_cache_1 = __importDefault(require("memory-cache"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const apiController = __importStar(require("./controllers/api"));
if (fs_1.default.existsSync(".env")) {
    console.log("Using .env file to supply config environment variables");
    dotenv_1.default.config({ path: ".env" });
}
const app = express_1.default();
app.set("port", process.env.PORT || 3000);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
var cache = (duration, key) => (req, res, next) => {
    const cachedBody = memory_cache_1.default.get(key);
    if (cachedBody) {
        return res.json(cachedBody);
    }
    const _json = res.json;
    res.json = (body) => {
        if (body) {
            memory_cache_1.default.put(key, body, duration * 1000);
        }
        return _json.call(res, body);
    };
    return next();
};
app.get("/", cache(parseInt(process.env["CACHE_TIME"]), "/"), apiController.getTitles);
exports.default = app;
//# sourceMappingURL=app.js.map