import { Box, Container, Text } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "./ErrorBoundary";

export const Layout = () => (
  <ErrorBoundary>
    <Box bgColor="black" marginBottom="2" padding="2">
      <Text color="white" textAlign="center">
        "The New York Times" article search application
      </Text>
    </Box>
    <Container>
      <Outlet />
    </Container>
  </ErrorBoundary>
);
