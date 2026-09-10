import MyOrders from "@/pages/myOrders";
import { useAuthStore } from "@/stores/userStore";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(proteced)/orders/")({
  beforeLoad: () => {
    if (!useAuthStore.getState().token) {
      throw redirect({ to: "/login" });
    }
  },
  component: MyOrders,
});
