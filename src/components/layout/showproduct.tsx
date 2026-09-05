import { useCartStore } from "@/stores/cartStore";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import Rating from "./rading";
import { useNavigate } from "@tanstack/react-router";
import { useGetColors } from "@/API/colors";

interface Props {
  id: number;
  img: string;
  name: string;
  rating: number;
  price: number;
  color?: string;
  discountPercentage: number;
}

export default function ShowProduct({
  id,
  img,
  name,
  rating,
  price,
  color,
  discountPercentage,
}: Props) {
  const priceAfter = price - (price * discountPercentage) / 100;
  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();
  const { data: colors } = useGetColors();
  const nameColor = colors?.data.find((i) => i.color === color)?.path;
  const {
    items: cartItems,
    decreaseQuantity,
    increaseQuantity,
  } = useCartStore();
  const cartItem = cartItems.find((item) => item.productId === id);
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <div className="relative">
        <div className="aspect-square w-full overflow-hidden">
          <img
            onClick={() => navigate({ to: `/stores/product/${id}` })}
            src={img}
            alt={name}
            className="h-full w-full cursor-pointer object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {discountPercentage > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
            -{discountPercentage}%
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
        <h3
          className="truncate text-base font-semibold cursor-pointer sm:text-lg"
          onClick={() => navigate({ to: `/stores/product/${id}` })}
        >
          {name}
        </h3>
        <div className="flex">
          <Rating rating={rating} type="main" />
        </div>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold sm:text-xl">
              ${priceAfter.toFixed(2)}
            </span>

            {discountPercentage > 0 && (
              <span className="text-sm text-muted-foreground line-through">
                ${price.toFixed(2)}
              </span>
            )}
          </div>
          <div>
            {cartItem ? (
              <div
                className="flex h-8 items-center gap-1 rounded-full border border-border bg-muted px-1"
                key={cartItem.productId}
              >
                <button
                  onClick={() => decreaseQuantity(cartItem.productId)}
                  className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-background"
                >
                  <Minus size={14} />
                </button>
                <span className="w-4 text-center text-sm">
                  {cartItem.quantity}
                </span>
                <button
                  onClick={() => increaseQuantity(cartItem.productId)}
                  className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-background"
                >
                  <Plus size={14} />
                </button>
              </div>
            ) : (
              <Button
                size="sm"
                className="rounded-full px-5"
                onClick={() => {
                  if (nameColor) {
                    addToCart({
                      productId: id,
                      name: name,
                      image: img,
                      price: priceAfter,
                      quantity: 1,
                      color: nameColor,
                      discount: price,
                    });
                  }
                }}
              >
                Add
                <ShoppingCart />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
