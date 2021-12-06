import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "./container/Layout";

const Home = lazy(() => import("./pages/Home"));
const Article = lazy(() => import("./pages/Article"));

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="article/:articleId"
          element={
            <Suspense fallback={<>...</>}>
              <Article />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  </Router>
);

export default App;
