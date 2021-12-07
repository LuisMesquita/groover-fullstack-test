import { useInfiniteQuery } from "react-query";
import { getArticles, GetArticlesParams, GetArticlesResponse } from "../api";

const PAGE_SIZE = 10;

export const useGetArticles = (params?: GetArticlesParams) => {
  return useInfiniteQuery<GetArticlesResponse, Error>(
    ["articles", params?.fullText],
    ({ pageParam = params?.pageParam }) =>
      getArticles({ ...params, pageParam }),
    {
      enabled: Boolean(params?.fullText),
      getNextPageParam: (lastPage, pages) => {
        const currentPage = lastPage.meta.offset / PAGE_SIZE;
        const totalPages = lastPage.meta.hits / PAGE_SIZE;
        return currentPage < totalPages && currentPage + 1;
      },
    }
  );
};
