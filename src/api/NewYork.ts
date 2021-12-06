import { Article } from "../types";
import {
  DEFAULT_PAGE,
  SEARCH_REQUIRED_FIELS,
  API_KEY,
  API_ENDPOINT,
  DEFAULT_FACET_FIELDS,
  NYT_ARTICLE_URI,
} from "./constants";
import { queryString } from "./utils";

type GetArticlesParams = {
  fullText?: string;
  page?: number;
  facets?: Record<string, string[]>;
};

interface SearchArticlesResponse {
  status: number;
  copyright: string;
  response: {
    docs: Article;
  };
}

export const getArticles = async ({
  fullText = "",
  page = DEFAULT_PAGE,
  facets = DEFAULT_FACET_FIELDS,
}: GetArticlesParams) => {
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

  return response.json() as Promise<SearchArticlesResponse>;
};

export const getArticlesById = async (id?: string) => {
  console.log({ id });
  if (!id) {
    throw new Error("Id required");
  }

  return getArticles({
    fullText: undefined,
    page: undefined,
    facets: { _id: [`"${NYT_ARTICLE_URI}${id}"`] },
  });
};
