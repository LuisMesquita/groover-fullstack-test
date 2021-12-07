export const API_ENDPOINT = process.env.REACT_APP_NEW_YORK_API_ENDPOINT;
export const API_KEY = process.env.REACT_APP_NEW_YORK_API_KEY;
export const NYT_ARTICLE_URI = "nyt://article/";

export const DEFAULT_PAGE = 0;
export const SEARCH_REQUIRED_FIELS = ["snippet", "_id", "lead_paragraph"];

export const DETAIL_REQUIRED_FIELS = [
  "web_url",
  "pub_date",
  "lead_paragraph",
  "snippet",
  "_id",
];
export const DEFAULT_FACET_FIELDS = {
  document_type: ["article"],
};
