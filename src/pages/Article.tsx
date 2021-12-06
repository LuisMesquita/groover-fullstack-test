import { useParams } from "react-router";
import { useArticleById } from "../hooks";

const Article = () => {
  const { articleId } = useParams();
  const { isLoading, data, isError, error } = useArticleById({ id: articleId });

  if (isLoading) {
    return <div> isLoading </div>;
  }

  if (isError) {
    return <div> {error?.message} </div>;
  }

  return <div>{data?.snippet}</div>;
};

export default Article;
