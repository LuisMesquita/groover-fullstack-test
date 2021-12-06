import { getArticles } from "../api";

const Home = () => {
  getArticles({ fullText: "Spelling Bee Forum" }).then((res) =>
    console.log({ res: res.response.docs })
  );

  return <div>Home Page</div>;
};

export default Home;
