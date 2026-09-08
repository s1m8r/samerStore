import { Filter } from "lucide-react";
import TitleContent from "./title";
import ShowProduct from "./showproduct";
import ProductCardSkeleton from "./productCardSkeleton";
import { ProdectScema } from "@/schemas/product";
import z from "zod";
import AccordionStore from "./accordionStore";
import { useState } from "react";
interface Props {
  title: string;
  products: z.infer<typeof ProdectScema>[];
  setColor: React.Dispatch<React.SetStateAction<string>>;
  isLoading?: boolean;
}
export default function StoreUi({
  title,
  products,
  setColor,
  isLoading,
}: Props) {
  const [open, setOpen] = useState(false);
  const maxPrice = products?.length
    ? Math.max(...products.map((item) => item.price))
    : 0;
  return (
    <div className="grid grid-cols-1 gap-6 px-4 py-4 md:grid-cols-12 md:px-12">
      <div className="mb-2 hidden h-fit self-start rounded-2xl border border-border px-4 py-6 sticky top-20 md:col-span-3 md:block lg:col-span-2">
        <div className="flex items-center justify-between">
          <span className="font-bold">Filters</span>
          <span>
            <Filter size={16} />
          </span>
        </div>
        <AccordionStore setColor={setColor} maxPrice={maxPrice} />
      </div>
      <div className="md:col-span-9 lg:col-span-10">
        <div className="flex items-center justify-between">
          <TitleContent title={title ?? ""} />
          <button
            onClick={() => setOpen(!open)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border md:hidden"
          >
            <Filter size={18} />
          </button>
        </div>
        {open && (
          <div className="mb-4 rounded-2xl border border-border px-4 py-4 md:hidden">
            <AccordionStore setColor={setColor} maxPrice={maxPrice} />
          </div>
        )}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : products?.length === 0 ? (
          <div className="flex h-40 items-center justify-center rounded-lg border border-border">
            <p className="text-muted-foreground">No products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products?.map((item) => (
              <ShowProduct
                key={item.id}
                id={item.id!}
                img={item.image}
                name={item.name}
                rating={item.rating}
                price={item.price}
                color={item.images[0].color}
                discountPercentage={item.discountPercentage}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
