import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import NotFound from "@/pages/notFound";
export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster richColors position="top-center" />
    </>
  ),
  notFoundComponent: NotFound,
});
