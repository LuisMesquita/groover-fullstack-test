import { ArticleDetail, ArticleSearch } from "../types";
import {
  DEFAULT_PAGE,
  SEARCH_REQUIRED_FIELS,
  API_KEY,
  API_ENDPOINT,
  DEFAULT_FACET_FIELDS,
  DETAIL_REQUIRED_FIELS,
} from "../contants";
import { facetQueryBuilder, queryString } from "../utils";

export type GetArticlesParams = {
  fullText?: string;
  pageParam?: number;
  facets?: Record<string, string[]>;
};

export type GetArticleById = {
  id?: string;
};

type Meta = {
  hits: number;
  offset: number;
  time: number;
};
export interface GetArticlesResponse {
  docs: ArticleSearch[];
  meta: Meta;
}
export interface GetArticleByIdResponse {
  docs: ArticleDetail[];
  meta: Meta;
}

export interface SearchApiResponse<response> {
  status: string;
  copyright: string;
  response: response;
}

export const getArticles = async (params?: GetArticlesParams) => {
  const {
    fullText = "",
    pageParam = DEFAULT_PAGE,
    facets = DEFAULT_FACET_FIELDS,
  } = params || {};
  try {
    const query = {
      q: fullText,
      page: pageParam,
      fq: facetQueryBuilder(facets),
      fl: SEARCH_REQUIRED_FIELS.join(","),
      "api-key": API_KEY,
    };
    const response = await fetch(
      `${API_ENDPOINT}articlesearch.json?${queryString(query)}`
    );
    if (!response.ok) {
      console.error(response.body);
      throw new Error(response.statusText);
    }

    const data = await response.json();
    return data?.response as GetArticlesResponse;
  } catch (error) {
    throw error;
  }
};

export const getArticleById = async ({ id }: GetArticleById) => {
  if (!id) {
    throw new Error("Id required");
  }

  try {
    const response = await fetch(
      `${API_ENDPOINT}articlesearch.json?${queryString({
        fq: facetQueryBuilder({ _id: [`"${id}"`] }),
        fl: DETAIL_REQUIRED_FIELS.join(","),
        "api-key": API_KEY,
      })}`
    );

    if (!response.ok) {
      console.error(response.body);
      throw new Error(response.statusText);
    }

    const data = await response.json();

    return data?.response?.docs[0] as ArticleDetail;
  } catch (error) {
    throw error;
  }
};
