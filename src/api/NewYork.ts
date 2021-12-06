import { Article } from "../types";
import {
  DEFAULT_PAGE,
  SEARCH_REQUIRED_FIELS,
  API_KEY,
  API_ENDPOINT,
  DEFAULT_FACET_FIELDS,
} from "../contants";
import { queryString } from "../utils";

export type GetArticlesParams = {
  fullText?: string;
  page?: number;
  facets?: Record<string, string[]>;
};

export type GetArticleById = {
  id?: string;
};

export const getArticles = async (params?: GetArticlesParams) => {
  const {
    fullText = "",
    page = DEFAULT_PAGE,
    facets = DEFAULT_FACET_FIELDS,
  } = params || {};
  try {
    const facetQuery = Object.keys(facets)
      .reduce<string[]>(
        (query, key) => [...query, `${key}:(${facets[key].join(" ")})`],
        []
      )
      .join(" AND ");
    const query = {
      q: fullText,
      page,
      fq: facetQuery,
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
    return data?.response?.docs as Article[];
  } catch (error) {
    throw error;
  }
};

export const getArticleById = async ({ id }: GetArticleById) => {
  if (!id) {
    throw new Error("Id required");
  }

  try {
    const data = await getArticles({
      fullText: undefined,
      page: undefined,
      facets: { _id: [`"${id}"`] },
    });

    return data[0] as Article;
  } catch (error) {
    throw error;
  }
};
