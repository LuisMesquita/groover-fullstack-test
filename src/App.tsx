import { ChakraProvider, Spinner } from "@chakra-ui/react";
import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "./container/";
import { ONE_HOUR } from "./contants";

const Home = lazy(() => import("./pages/Home"));
const Article = lazy(() => import("./pages/Article"));

export const queryClient = new QueryClient();
queryClient.setDefaultOptions({
  queries: { staleTime: ONE_HOUR },
});

const App = () => (
  <Suspense fallback={<Spinner size="lg" />}>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="article/:articleId" element={<Article />} />
            </Route>
          </Routes>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </ChakraProvider>
    </QueryClientProvider>
  </Suspense>
);

export default App;
