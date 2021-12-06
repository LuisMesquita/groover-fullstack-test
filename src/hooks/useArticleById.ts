import { useQuery } from "react-query";
import { getArticleById, GetArticleById } from "../api";
import { useQueryClient } from "react-query";
import { Article } from "../types";
import { getFullId } from "../utils";

export const useArticleById = ({ id }: GetArticleById) => {
  const queryClient = useQueryClient() as any;
  const articleId = getFullId(id);
  return useQuery<Article, Error>(
    ["article", id],
    () => getArticleById({ id: articleId }),
    {
      initialData: () => {
        return queryClient
          .getQueryData("articles")
          ?.find((article: Article) => {
            return article._id === articleId;
          });
      },
    }
  );
};
