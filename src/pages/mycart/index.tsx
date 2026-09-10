import { useCart } from "@/API/cart";
import TitleContent from "@/components/layout/title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/stores/cartStore";
import { useAuthStore } from "@/stores/userStore";
import { useNavigate } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const MyCart = () => {
  const { mutate } = useCart();
  const user = useAuthStore.getState().user;
  const [open, setOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const applyPromoCode = () => {
    if (!promoCode.trim()) return;
    toast.success(`Code "${promoCode.trim()}" applied`);
    setPromoCode("");
  };
  const goCart = () => {
    if (!user) {
      setOpen(true);
      return;
    }
    if (totalPrice() === 0) return;
    const array = items.map((item) => ({
      color: item.color,
      productId: item.productId,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
      discount: item.discount,
    }));

    mutate(
      {
        data: array,
        email: user.email,
      },
      {
        onSuccess: () => {
          toast.success("Purchase completed successfully");
          setTimeout(() => {
            clearCart();
          }, 1000);
        },
      },
    );
  };
  const {
    items,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    totalPrice,
    clearCart,
    Subtotal,
  } = useCartStore();
  const navigator = useNavigate();
  return (
    <div className="px-4 py-4 md:px-12">
      <TitleContent title="My Cart" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        <div className={items.length === 0 ? "md:col-span-12" : "md:col-span-8"}>
          {items.length !== 0 && (
            <div className="max-h-[calc(80vh-80px)] space-y-3 overflow-y-auto pr-1">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="flex flex-col gap-3 rounded-xl border border-border bg-card p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 shrink-0 rounded-md object-cover"
                    />

                    <div className="min-w-0">
                      <h3 className="truncate font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Price: ${item.discount.toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Color: {item.color}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        <span>Discount: </span>
                        <span className="text-red-500">
                          -${(item.discount - item.price).toFixed(2)}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => decreaseQuantity(item.productId)}
                      className="h-8 w-8 rounded border border-border hover:bg-muted"
                    >
                      <Minus size={16} className="mx-auto" />
                    </button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.productId)}
                      className="h-8 w-8 rounded border border-border hover:bg-muted"
                    >
                      <Plus size={16} className="mx-auto" />
                    </button>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {items.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-16 text-muted-foreground">
              <span>Your cart is empty.</span>
              <Button onClick={() => navigator({ to: "/" })}>Go to Home</Button>
            </div>
          )}
        </div>

        {items.length !== 0 && (
        <div className="h-fit rounded-2xl border border-border bg-card p-5 shadow-sm md:col-span-4">
          <h1 className="text-lg font-semibold">Order Summary</h1>
          <div className="space-y-1 border-b border-border py-2 pb-4">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Subtotal</span>

              <span className="text-sm font-bold">
                ${totalPrice().toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Discount</span>
              <span className="text-sm font-bold text-red-500">
                ${(Subtotal() - totalPrice()).toFixed(2)}
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex gap-2 border-b border-border pb-4">
              <Input
                placeholder="Discount code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <Button
                type="button"
                variant="outline"
                onClick={applyPromoCode}
                disabled={!promoCode.trim()}
              >
                Apply
              </Button>
            </div>
            <div className="mt-2 flex justify-between">
              <span className="text-sm font-bold">Total</span>
              <span className="text-sm font-bold">
                ${(totalPrice() - (totalPrice() - Subtotal())).toFixed(2)}
              </span>
            </div>
            <div>
              <Button
                onClick={goCart}
                className="w-full"
                disabled={totalPrice() === 0}
              >
                Buy
              </Button>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent showCloseButton>
                  <DialogHeader>
                    <DialogTitle>Please Login</DialogTitle>
                    <DialogDescription>
                      You need to be logged in to complete your purchase.
                    </DialogDescription>
                  </DialogHeader>
                  <Button onClick={() => navigator({ to: "/login" })}>
                    Go to Login
                  </Button>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default MyCart;
