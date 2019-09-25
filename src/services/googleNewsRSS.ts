import { parseStringPromise } from "xml2js";
import axios from "axios";
import { RSS } from "../models/rss";

function isRSS(obj: any): obj is RSS {
    return "rss" in obj;
}

export async function requestTitles() {
    try {
        const response = await axios.get("https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en");

        const parsed = await parseStringPromise(response.data);

        if (isRSS(parsed)) {
            const { rss: { channel: [channel] } } = parsed;
            return channel.item.map(item => item.title[0]);
        }
    } catch (error) {
        return [];
    }
}