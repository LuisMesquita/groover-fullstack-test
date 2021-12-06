import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "./container/";

const Home = lazy(() => import("./pages/Home"));
const Article = lazy(() => import("./pages/Article"));

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="article/:articleId" element={<Article />} />
        </Route>
      </Routes>
    </Router>
  </Suspense>
);

export default App;
