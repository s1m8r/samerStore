import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

const NotFound = () => {
  const navigator = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-7xl font-bold text-orange-500">404</p>

      <h1 className="text-xl font-semibold">Page not found</h1>

      <p className="max-w-md text-sm text-muted-foreground">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <Button
        className="mt-2 rounded-full px-8"
        onClick={() => navigator({ to: "/" })}
      >
        Go to Home
      </Button>
    </div>
  );
};

export default NotFound;
