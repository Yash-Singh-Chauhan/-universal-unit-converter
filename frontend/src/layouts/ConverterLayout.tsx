import { Outlet } from "react-router-dom";

export function ConverterLayout() {
  return (
    <div className="space-y-6">
      <Outlet />
    </div>
  );
}
