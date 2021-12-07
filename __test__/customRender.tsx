import { render, RenderOptions } from "@testing-library/react";
import React, { FC, ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const AllTheProviders: FC = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export { customRender as render };
