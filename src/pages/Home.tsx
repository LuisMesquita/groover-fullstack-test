import { useCallback, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce/lib";
import { DEFAULT_PAGE } from "../contants";
import { useGetArticles } from "../hooks";
import { getHashId } from "../utils";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || `${DEFAULT_PAGE}`);
  const searchValue = searchParams.get("searchValue") || "";
  const [debouncedSearchValue] = useDebounce(searchValue, 1000);

  const {
    data,
    error,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    isFetching,
    isFetchingPreviousPage,
    isFetchingNextPage,
    status,
  } = useGetArticles({ fullText: debouncedSearchValue, pageParam: page });

  const handleNextPage = useCallback(() => {
    const nextPage = page + 1;
    setSearchParams({ page: nextPage.toString(), searchValue });
    fetchNextPage({ pageParam: nextPage });
  }, [fetchNextPage, page, searchValue, setSearchParams]);

  const handlePrevPage = useCallback(() => {
    const prevPage = page - 1;
    setSearchParams({ page: prevPage.toString(), searchValue });
    fetchPreviousPage({ pageParam: prevPage });
  }, [fetchPreviousPage, page, searchValue, setSearchParams]);

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Search for a article"
          onChange={({ target: { value } }) =>
            setSearchParams({ searchValue: value, page: page.toString() })
          }
          value={searchValue}
          disabled={isFetching}
        />
      </form>
      <>
        {data?.pages[page || DEFAULT_PAGE]?.docs.map((doc) => (
          <Link key={getHashId(doc._id)} to={`/article/${getHashId(doc._id)}`}>
            {doc.snippet}
          </Link>
        ))}
        <div>
          <button
            onClick={() => handlePrevPage()}
            disabled={isFetchingPreviousPage || page <= 0}
          >
            {isFetchingNextPage
              ? "Loading more..."
              : page > 0
              ? "Load More"
              : "Nothing more to load"}
          </button>
        </div>
        <div>
          <button
            onClick={() => handleNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
              ? "Load More"
              : "Nothing more to load"}
          </button>
        </div>
        <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
      </>

      {status === "error" && <div> {error?.message} </div>}
    </div>
  );
};

export default Home;
