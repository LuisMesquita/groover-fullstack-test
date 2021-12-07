import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";
import { CloseButton } from "@chakra-ui/close-button";
import { Input } from "@chakra-ui/input";
import { Text, Container, Flex, Spacer } from "@chakra-ui/layout";
import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce/lib";
import { ArticleList } from "../components";
import { DEFAULT_PAGE, DEFAULT_PAGE_TILE } from "../contants";
import { useGetArticles } from "../hooks";
import { ArticleSearch } from "../types";

const Home = () => {
  const [currentPage, setCurrentPage] = useState<ArticleSearch[] | undefined>();
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
    isFetched,
    isFetching,
    isFetchingPreviousPage,
    isFetchingNextPage,
    status,
  } = useGetArticles({ fullText: debouncedSearchValue, pageParam: page });

  useEffect(() => {
    const currentIndex =
      data?.pageParams && data?.pageParams.indexOf(page) > 0
        ? data?.pageParams.indexOf(page)
        : 0;
    setCurrentPage(data?.pages?.[currentIndex]?.docs);
  }, [data?.pageParams, data?.pages, page]);

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

  const handleSubmit: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    setSearchParams({ searchValue: event.target.value, page: "0" });
  };

  return (
    <>
      <Helmet>
        <title>
          {debouncedSearchValue
            ? `${debouncedSearchValue} | ${DEFAULT_PAGE_TILE}`
            : DEFAULT_PAGE_TILE}
        </title>
      </Helmet>
      <Container>
        <label aria-label="search" id="search-label">
          <Text marginBottom="3" fontWeight="bold">
            Type search query terms in here:
          </Text>
        </label>
        <Input
          type="text"
          placeholder="Search for a article"
          onChange={handleSubmit}
          name="search"
          aria-labelledby="search-label"
          value={searchValue}
          disabled={isFetching}
          size="sm"
          marginBottom="7"
        />
        <>
          <Text marginBottom="2" fontWeight="bold">
            Results:
          </Text>
          <ArticleList
            isFetched={isFetched}
            isFetching={isFetching}
            articles={currentPage}
          />
        </>
        <Flex my="2" paddingX="1">
          <Button
            onClick={() => handlePrevPage()}
            disabled={isFetchingPreviousPage || page <= 0}
            isLoading={isFetchingPreviousPage}
            variant="link"
          >
            previous page
          </Button>
          <Spacer />
          <Button
            onClick={() => handleNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            isLoading={isFetchingNextPage}
            variant="link"
          >
            next page
          </Button>
        </Flex>
        {status === "error" && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>{error?.message}</AlertTitle>
            <CloseButton position="absolute" right="8px" top="8px" />
          </Alert>
        )}
      </Container>
    </>
  );
};

export default Home;
