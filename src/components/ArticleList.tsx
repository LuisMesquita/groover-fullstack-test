import { ArticleSearch } from "../types";
import { getHashId } from "../utils";
import {
  Text,
  VStack,
  Link as LayoutLink,
  Center,
  Container,
  List,
  ListItem,
} from "@chakra-ui/layout";
import { RepeatIcon } from "@chakra-ui/icons";
import { Skeleton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
interface ArticleListProps {
  isFetching: boolean;
  isFetched: boolean;
  articles?: ArticleSearch[];
}

export const ArticleList = ({
  isFetching,
  isFetched,
  articles,
}: ArticleListProps) => {
  if (isFetching) {
    return (
      <VStack spacing={1} align="stretch">
        {isFetching &&
          Array(10)
            .fill("")
            .map((_, i) => (
              <Skeleton height="35px" key={i} data-testid="article-skeleton" />
            ))}
      </VStack>
    );
  }

  if (!isFetching && isFetched && !(articles && articles.length > 0)) {
    return (
      <Container my={10}>
        <Center mb={4}>
          <RepeatIcon w={10} h={10} />
        </Center>
        <Text textAlign="center">
          No results found
          <br /> please search again with a new input
        </Text>
      </Container>
    );
  }
  return (
    <List>
      {articles?.map((article) => (
        <ListItem
          key={getHashId(article._id)}
          borderWidth="1px"
          borderRadius="lg"
          padding="2"
          marginBottom="1"
          width="100%"
        >
          <LayoutLink to={`/article/${getHashId(article._id)}`} as={Link}>
            <Text fontSize="xs" noOfLines={1}>
              {article.headline.main}
            </Text>
          </LayoutLink>
        </ListItem>
      ))}
    </List>
  );
};
