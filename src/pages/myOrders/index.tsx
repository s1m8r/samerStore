import { useGetCart } from "@/API/cart";
import TitleContent from "@/components/layout/title";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/stores/userStore";
import { useNavigate } from "@tanstack/react-router";

const MyOrders = () => {
  const user = useAuthStore.getState().user?.email;
  const { data, isLoading } = useGetCart(user ?? "", !!user);
  const navigator = useNavigate();

  const orders = data?.data ?? [];

  const totalOrders = orders.length;

  const subtotal = orders.reduce(
    (orderTotal, order) =>
      orderTotal +
      order.data.reduce((total, item) => total + item.price * item.quantity, 0),
    0,
  );

  const total = subtotal;

  return (
    <div className="px-4 md:px-12">
      <TitleContent title="My Orders" />

      {user && isLoading ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-8">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border bg-card p-4 shadow-sm"
              >
                <div className="flex items-center justify-between gap-2 border-b border-border pb-3">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <Skeleton className="h-5 w-20 rounded-full" />
                </div>
                <div className="space-y-3 py-3">
                  {Array.from({ length: 2 }).map((_, j) => (
                    <div
                      key={j}
                      className="flex items-center gap-3 rounded-lg bg-muted p-3"
                    >
                      <Skeleton className="h-16 w-16 shrink-0 rounded-md" />
                      <div className="flex-1 space-y-1.5">
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-3 w-1/3" />
                        <Skeleton className="h-3 w-1/4" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-4">
            <div className="h-fit space-y-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>
      ) : !user ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-20 text-muted-foreground">
          <span>Please Login to view your orders.</span>

          <Button onClick={() => navigator({ to: "/login" })}>
            Go to Login
          </Button>
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-20 text-muted-foreground">
          <span>No orders yet.</span>

          <Button onClick={() => navigator({ to: "/" })}>Go to Home</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Orders */}
          <div className="lg:col-span-8">
            <div className="space-y-5">
              {orders.map((order, index) => {
                const orderTotal = order.data.reduce(
                  (sum, item) => sum + item.price * item.quantity,
                  0,
                );

                return (
                  <div
                    key={order.id}
                    className="rounded-2xl border border-border bg-card p-4 shadow-sm"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
                      <div>
                        <h2 className="font-semibold">
                          Order {(data?.pagination.totalItems ?? 0) - index}
                        </h2>

                        <p className="text-sm text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-US",
                          )}
                        </p>
                      </div>

                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-600">
                        Completed
                      </span>
                    </div>

                    {/* Products */}
                    <div className="space-y-3 py-3">
                      {order.data.map((item) => {
                        const itemTotal = item.price * item.quantity;

                        return (
                          <div
                            key={item.productId}
                            className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-muted p-3"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-16 w-16 shrink-0 rounded-md object-cover"
                              />

                              <div className="min-w-0">
                                <h3 className="truncate font-medium">
                                  {item.name}
                                </h3>

                                <p className="text-sm text-muted-foreground">
                                  Price: ${item.price.toFixed(2)}
                                </p>

                                <p className="text-sm text-muted-foreground">
                                  Color: {item.color}
                                </p>

                                <p className="text-sm text-muted-foreground">
                                  Quantity: {item.quantity}
                                </p>
                              </div>
                            </div>

                            <div className="text-right">
                              <p className="font-semibold">
                                ${itemTotal.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Order Total */}
                    <div className="border-t border-border pt-3">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>

                        <span>${orderTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-4">
            <div className="h-fit rounded-2xl border border-border bg-card p-5 shadow-sm lg:sticky lg:top-20">
              <h1 className="text-xl font-bold">Order Summary</h1>

              <div className="space-y-2 border-b border-border py-4">
                {/* Total Orders */}
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Total Orders
                  </span>

                  <span className="text-sm font-bold">{totalOrders}</span>
                </div>

                {/* Subtotal */}
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Subtotal
                  </span>

                  <span className="text-sm font-bold">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="mt-4 flex justify-between">
                <span className="font-bold">Total</span>

                <span className="font-bold">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
