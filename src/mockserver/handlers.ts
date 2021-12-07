import { rest } from "msw";
import { API_ENDPOINT, NYT_ARTICLE_URI } from "../contants";
import { ArticleDetail } from "./fixtures/detail";
import { ArticleList, EmptyList } from "./fixtures/search";

export const handlers = [
  rest.get(`${API_ENDPOINT}articlesearch.json`, (req, res, ctx) => {
    let response = req.url.search.includes(NYT_ARTICLE_URI)
      ? ArticleDetail
      : ArticleList;

    if (req.url.search.includes("invalidinput")) {
      response = EmptyList;
    }
    return res(ctx.status(200), ctx.json(response));
  }),
];
