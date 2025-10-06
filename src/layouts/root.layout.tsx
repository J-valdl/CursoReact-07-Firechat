import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <>
      <Outlet></Outlet>
      <Toaster position="top-right" richColors />
    </>
  );
};

export default RootLayout;
