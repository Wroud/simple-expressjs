export interface Channel {
    item: Item[];
}

export interface Item {
    title: string[];
}

export interface RSS {
    rss: {
        channel: Channel[];
    };
}