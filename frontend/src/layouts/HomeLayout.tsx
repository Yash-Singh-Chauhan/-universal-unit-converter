import { Outlet } from "react-router-dom";

export function HomeLayout() {
  return (
    <div className="space-y-8">
      <Outlet />
    </div>
  );
}
