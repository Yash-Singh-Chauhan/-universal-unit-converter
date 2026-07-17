import type { RouteObject } from "react-router-dom";
import { MainLayout } from "@/components/layout";
import {
  HomePage,
  NotFoundPage,
  FavoritesPage,
  SettingsPage,
  HeightConverterPage,
  WeightConverterPage,
  VolumeConverterPage,
  CurrencyConverterPage,
  PlanetGravityConverterPage,
} from "@/pages";

/**
 * Route configuration.
 * To add a new converter:
 * 1. Register it in converterRegistry.ts
 * 2. Create its page in pages/converters/
 * 3. Add the route below
 */
export const routeConfig: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "height",
        element: <HeightConverterPage />,
      },
      {
        path: "weight",
        element: <WeightConverterPage />,
      },
      {
        path: "volume",
        element: <VolumeConverterPage />,
      },
      {
        path: "currency",
        element: <CurrencyConverterPage />,
      },
      {
        path: "planet-gravity",
        element: <PlanetGravityConverterPage />,
      },
      {
        path: "favorites",
        element: <FavoritesPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "404",
        element: <NotFoundPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
];
