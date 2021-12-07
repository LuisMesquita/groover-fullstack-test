import { useQuery } from "react-query";
import { getArticleById, GetArticleById } from "../api";
import { Article } from "../types";
import { getFullId } from "../utils";

export const useArticleById = ({ id }: GetArticleById) => {
  const articleId = getFullId(id);
  return useQuery<Article, Error>(["article", id], () =>
    getArticleById({ id: articleId })
  );
};
