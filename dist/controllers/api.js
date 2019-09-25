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
Object.defineProperty(exports, "__esModule", { value: true });
const googleNewsRSS_1 = require("../services/googleNewsRSS");
/**
 * GET /
 * Returns titles in json.
 */
exports.getTitles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const titles = yield googleNewsRSS_1.requestTitles();
    res.json(titles);
});
//# sourceMappingURL=api.js.map