import Login from "@/pages/login/login";
import { useAuthStore } from "@/stores/userStore";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(login)/login")({
  beforeLoad: () => {
    if (useAuthStore.getState().token) {
      throw redirect({ to: "/" });
    }
  },
  component: Login,
});
