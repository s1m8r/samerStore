import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer/footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Outlet, createRootRoute } from "@tanstack/react-router";
export const Route = createRootRoute({
  component: () => (
    <TooltipProvider>
      <Header />
      <Outlet />
      <Footer />
    </TooltipProvider>
  ),
});
