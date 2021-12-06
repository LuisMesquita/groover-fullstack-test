import { useParams } from "react-router";

const Article = () => {
  const { articleId } = useParams();

  return <div>{articleId} Detail Page</div>;
};

export default Article;
