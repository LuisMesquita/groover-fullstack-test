import { useQuery } from "react-query";
import { getArticleById, GetArticleById } from "../api";
import { ArticleDetail } from "../types";
import { getFullId } from "../utils";

export const useArticleById = ({ id }: GetArticleById) =>
  useQuery<ArticleDetail, Error>(["article", id], () =>
    getArticleById({ id: getFullId(id) })
  );
