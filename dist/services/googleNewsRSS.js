"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const xml2js_1 = require("xml2js");
const axios_1 = __importDefault(require("axios"));
function isRSS(obj) {
    return "rss" in obj;
}
function requestTitles() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get("https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en");
            const parsed = yield xml2js_1.parseStringPromise(response.data);
            if (isRSS(parsed)) {
                const { rss: { channel: [channel] } } = parsed;
                return channel.item.map(item => item.title[0]);
            }
        }
        catch (error) {
            return [];
        }
    });
}
exports.requestTitles = requestTitles;
//# sourceMappingURL=googleNewsRSS.js.map