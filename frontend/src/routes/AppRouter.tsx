import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routeConfig } from "./routeConfig";
import { ErrorBoundary } from "@/components/common";

const router = createBrowserRouter(routeConfig, {
  future: {
    v7_relativeSplatPath: true,
  },
});

export function AppRouter() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}
