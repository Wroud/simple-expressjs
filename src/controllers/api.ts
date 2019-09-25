import { Response, Request } from "express";
import { requestTitles } from "../services/googleNewsRSS";


/**
 * GET /
 * Returns titles in json.
 */
export const getTitles = async (req: Request, res: Response) => {
    const titles = await requestTitles();
    res.json(titles);
};