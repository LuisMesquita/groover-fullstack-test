import { useParams } from "react-router";
import { getArticlesById } from "../api";

const Article = () => {
  const { articleId } = useParams();
  getArticlesById(articleId).then((res) => console.log({ res: res }));
  return <div>{articleId} Detail Page</div>;
};

export default Article;
