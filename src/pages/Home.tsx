import { Link } from "react-router-dom";
import { useGetArticles } from "../hooks";
import { getHashId } from "../utils";

const Home = () => {
  const { data, isError, error } = useGetArticles({ fullText: "" });

  if (isError) {
    return <div> {error?.message} </div>;
  }

  return (
    <div>
      {data?.map((doc) => (
        <Link to={`/article/${getHashId(doc._id)}`}>{doc.snippet}</Link>
      ))}
    </div>
  );
};

export default Home;
