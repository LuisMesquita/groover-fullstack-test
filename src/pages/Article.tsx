import { ChevronLeftIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Container,
  Text,
  Link as LayoutLink,
  Heading,
  Center,
  Flex,
} from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useArticleById } from "../hooks";
import { format } from "date-fns";
import { Helmet } from "react-helmet";
import { DEFAULT_PAGE_TILE } from "../contants";
import { Button } from "@chakra-ui/button";

const Article = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const { isLoading, data, isError, error } = useArticleById({ id: articleId });
  const formatedDate = useMemo(
    () => data?.pub_date && format(new Date(data?.pub_date), "MM/dd/yyyy"),
    [data?.pub_date]
  );

  const pageTitle = useMemo(
    () =>
      data?.headline.seo
        ? `${data?.headline.seo} | ${DEFAULT_PAGE_TILE}`
        : DEFAULT_PAGE_TILE,
    [data?.headline.seo]
  );

  if (isLoading) {
    return (
      <Center>
        <Spinner size="lg" />
      </Center>
    );
  }

  if (isError) {
    return <div> {error?.message} </div>;
  }

  if (!data) {
    return (
      <>
        <Helmet>
          <title>Article not found | {pageTitle}</title>
        </Helmet>
        <Flex my={10} flexDirection="column" alignItems="center">
          <Heading my={5}> 404 article not found </Heading>
          <Text textAlign="center">
            The <strong>{articleId}</strong> id is not valid, please try to see
            the details of a different Product.
          </Text>
          <Button my={5} variant="link">
            <LayoutLink as={Link} to={"/"} marginLeft="5">
              Search for new articles
            </LayoutLink>
          </Button>
        </Flex>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <Container>
        <LayoutLink
          as={Link}
          to={"-1"}
          onClick={() => navigate(-1)}
          marginBottom="2"
        >
          <Text fontSize="xs">
            <ChevronLeftIcon marginBottom="2px" /> Go to results page
          </Text>
        </LayoutLink>
        <Heading marginBottom="3" noOfLines={[3, 5, 8]}>
          {data?.headline.main}
        </Heading>
        {formatedDate && <Text marginBottom="3">{formatedDate}</Text>}
        {data?.lead_paragraph && (
          <Text marginBottom="2">{data?.lead_paragraph}</Text>
        )}
        {data?.web_url && (
          <LayoutLink href={data?.web_url} isExternal>
            <Text fontSize="xs">
              Read the full article{" "}
              <ExternalLinkIcon mx="2px" marginBottom="2px" />
            </Text>
          </LayoutLink>
        )}
      </Container>
    </>
  );
};

export default Article;
