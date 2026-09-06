import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer/footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  Outlet,
  createRootRoute,
  useRouterState,
} from "@tanstack/react-router";

function PageTransition() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div key={pathname} className="animate-in fade-in duration-300">
      <Outlet />
    </div>
  );
}

export const Route = createRootRoute({
  component: () => (
    <TooltipProvider>
      <Header />
      <PageTransition />
      <Footer />
    </TooltipProvider>
  ),
});
