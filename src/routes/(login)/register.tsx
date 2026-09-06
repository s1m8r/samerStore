import Register from "@/pages/login/register";
import { useAuthStore } from "@/stores/userStore";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(login)/register")({
  beforeLoad: () => {
    if (useAuthStore.getState().token) {
      throw redirect({ to: "/" });
    }
  },
  component: Register,
});
