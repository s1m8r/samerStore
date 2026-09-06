import { useCartStore } from "@/stores/cartStore";
import { Minus, Plus, ShoppingCart, Star } from "lucide-react";
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
    <div className="group flex h-full flex-col">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-muted">
        <img
          onClick={() => navigate({ to: `/stores/product/${id}` })}
          src={img}
          alt={name}
          className="h-full w-full cursor-pointer object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {discountPercentage > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">
            -{discountPercentage}%
          </span>
        )}

        {cartItem ? (
          <div className="absolute bottom-3 right-3 flex h-9 items-center gap-1 rounded-full bg-background px-1">
            <button
              onClick={() => decreaseQuantity(cartItem.productId)}
              className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-muted"
            >
              <Minus size={14} />
            </button>
            <span className="w-4 text-center text-sm font-medium">
              {cartItem.quantity}
            </span>
            <button
              onClick={() => increaseQuantity(cartItem.productId)}
              className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-muted"
            >
              <Plus size={14} />
            </button>
          </div>
        ) : (
          <button
            aria-label="Add to cart"
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
            className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-background text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <ShoppingCart size={16} />
          </button>
        )}
      </div>

      <div className="mt-2.5 flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3
            className="cursor-pointer truncate text-base font-semibold"
            onClick={() => navigate({ to: `/stores/product/${id}` })}
          >
            {name}
          </h3>
          <div className="flex shrink-0 items-center gap-1 text-sm font-light text-muted-foreground">
            <Star size={15} className="fill-yellow-500 text-yellow-500" />
            <span>{rating}</span>
          </div>
        </div>

        <div className="mt-auto flex items-baseline gap-2 pt-2">
          <span className="text-lg font-bold">${priceAfter.toFixed(2)}</span>
          {discountPercentage > 0 && (
            <span className="text-sm text-muted-foreground line-through">
              ${price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
