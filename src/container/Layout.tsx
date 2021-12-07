import { Box, Text } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "./ErrorBoundary";
import { Helmet } from "react-helmet";
import { DEFAULT_PAGE_TILE } from "../contants";

export const Layout = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{DEFAULT_PAGE_TILE}</title>
        <meta
          name="description"
          content="Search for any New York Times articles"
        />
      </Helmet>
      <ErrorBoundary>
        <Box bgColor="black" marginBottom="2" padding="2">
          <Text color="white" textAlign="center">
            "The New York Times" article search application
          </Text>
        </Box>
        <Outlet />
      </ErrorBoundary>
    </>
  );
};
