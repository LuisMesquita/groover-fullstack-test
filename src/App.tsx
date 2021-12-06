import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "./container/";

const Home = lazy(() => import("./pages/Home"));
const Article = lazy(() => import("./pages/Article"));

const ONE_HOUR = 1000 * 60 * 60;

export const queryClient = new QueryClient();
queryClient.setDefaultOptions({
  queries: { staleTime: ONE_HOUR },
});

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="article/:articleId" element={<Article />} />
          </Route>
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </Suspense>
);

export default App;
