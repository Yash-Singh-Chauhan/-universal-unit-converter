import { useMediaQuery } from "@/hooks";
import { DesktopLayout } from "./DesktopLayout";
import { MobileLayout } from "./MobileLayout";

export function MainLayout() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (isDesktop) {
    return <DesktopLayout />;
  }

  return <MobileLayout />;
}
