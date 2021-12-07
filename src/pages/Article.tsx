import { ChevronLeftIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Container,
  Text,
  Link as LayoutLink,
  Heading,
  Center,
} from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useArticleById } from "../hooks";
import { format } from "date-fns";

const Article = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const { isLoading, data, isError, error } = useArticleById({ id: articleId });
  const formatedDate = useMemo(
    () => data?.pub_date && format(new Date(data?.pub_date), "MM/dd/yyyy"),
    [data?.pub_date]
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

  return (
    <Container>
      <LayoutLink
        as={Link}
        to={`-1`}
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
      <LayoutLink href={data?.web_url || ""} isExternal>
        <Text fontSize="xs">
          Read the full article <ExternalLinkIcon mx="2px" marginBottom="2px" />
        </Text>
      </LayoutLink>
    </Container>
  );
};

export default Article;
