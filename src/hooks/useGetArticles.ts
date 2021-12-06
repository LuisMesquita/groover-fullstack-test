import { useQuery } from "react-query";
import { getArticles, GetArticlesParams } from "../api";
import { Article } from "../types";

export const useGetArticles = (params: GetArticlesParams) =>
  useQuery<Article[], Error>(["articles"], () => getArticles(params));
