import { rest } from "msw";
import { API_ENDPOINT, NYT_ARTICLE_URI } from "../contants";
import { ArticleDetail } from "./fixtures/detail";
import { ArticleList } from "./fixtures/search";

export const handlers = [
  rest.get(`${API_ENDPOINT}articlesearch.json`, (req, res, ctx) => {
    console.log({ dale: req.url.search.includes("_id"), req });
    const response = req.url.search.includes(NYT_ARTICLE_URI)
      ? ArticleDetail
      : ArticleList;
    return res(ctx.status(200), ctx.json(response));
  }),
];
