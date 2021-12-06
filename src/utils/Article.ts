import { NYT_ARTICLE_URI } from "../api/constants";

// nyt://article/hash => hash
export const getHashId = (fullId: string) => fullId.split("/")[3];

// id => nyt://article/id
export const getFullId = (id?: string) => (id ? `${NYT_ARTICLE_URI}${id}` : "");
