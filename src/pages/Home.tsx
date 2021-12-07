import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce/lib";
import { useGetArticles } from "../hooks";
import { getHashId } from "../utils";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue] = useDebounce(searchValue, 1000);
  const [page, setPage] = useState(0);

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
  } = useGetArticles({ fullText: debouncedSearchValue });

  const handleNextPage = useCallback(() => {
    setPage(page + 1);
    fetchNextPage({ pageParam: page + 1 });
  }, [fetchNextPage, page]);

  const handlePrevPage = useCallback(() => {
    setPage(page - 1);
    fetchPreviousPage({ pageParam: page - 1 });
  }, [fetchPreviousPage, page]);

  if (status === "error") {
    return <div> {error?.message} </div>;
  }

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Search for a article"
          onChange={({ target: { value } }) => setSearchValue(value)}
          value={searchValue}
          disabled={isFetching}
        />
      </form>
      <>
        {data?.pages[page]?.docs.map((doc) => (
          <Link key={getHashId(doc._id)} to={`/article/${getHashId(doc._id)}`}>
            {doc.snippet}
          </Link>
        ))}
        <div>
          <button
            onClick={() => handlePrevPage()}
            disabled={isFetchingPreviousPage || page <= 0}
          >
            {isFetchingPreviousPage
              ? "Loading more..."
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
    </div>
  );
};

export default Home;
