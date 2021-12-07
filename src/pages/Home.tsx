import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/alert";
import { Button, ButtonGroup } from "@chakra-ui/button";
import { CloseButton } from "@chakra-ui/close-button";
import { Input } from "@chakra-ui/input";
import {
  Text,
  Container,
  LinkBox,
  StackDivider,
  VStack,
} from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { Spinner } from "@chakra-ui/spinner";
import { useCallback, useEffect, useState } from "react";
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

  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  useEffect(() => {
    const currentIndex =
      data?.pageParams && data?.pageParams.indexOf(page) > 0
        ? data?.pageParams.indexOf(page)
        : 0;
    setCurrentPageIndex(currentIndex);
  }, [data?.pageParams, page]);

  return (
    <Container>
      <form>
        <Input
          type="text"
          placeholder="Search for a article"
          onChange={({ target: { value } }) =>
            setSearchParams({ searchValue: value, page: page.toString() })
          }
          value={searchValue}
          disabled={isFetching}
        />
      </form>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={1}
        align="stretch"
      >
        {isFetching
          ? Array(10)
              .fill("")
              .map((_, i) => <Skeleton height="25px" key={i} />)
          : data?.pages[currentPageIndex]?.docs.map((doc) => (
              <LinkBox key={getHashId(doc._id)}>
                <Link to={`/article/${getHashId(doc._id)}`}>
                  <Text fontSize="sm">{doc.snippet}</Text>
                </Link>
              </LinkBox>
            ))}
      </VStack>
      <ButtonGroup>
        <Button
          onClick={() => handlePrevPage()}
          disabled={isFetchingPreviousPage || page <= 0}
        >
          {isFetchingPreviousPage ? <Spinner /> : "previous page"}
        </Button>
        <Button
          onClick={() => handleNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage ? <Spinner /> : "next page"}
        </Button>
      </ButtonGroup>
      {status === "error" && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>{error?.message}</AlertTitle>
          <CloseButton position="absolute" right="8px" top="8px" />
        </Alert>
      )}
    </Container>
  );
};

export default Home;
