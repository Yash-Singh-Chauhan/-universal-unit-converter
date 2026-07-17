import { Outlet } from "react-router-dom";

export function ConverterLayout() {
  return (
    <div className="space-y-4 sm:space-y-5 md:space-y-6">
      <Outlet />
    </div>
  );
}
