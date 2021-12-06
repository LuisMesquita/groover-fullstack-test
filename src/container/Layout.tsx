import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "./ErrorBoundary";

export const Layout = () => (
  <ErrorBoundary>
    <Outlet />
  </ErrorBoundary>
);
