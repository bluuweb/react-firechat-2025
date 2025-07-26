import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div>
      <Outlet />
      <Toaster
        position="top-right"
        richColors
      />
    </div>
  );
};
export default RootLayout;
