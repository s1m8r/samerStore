import ShowProduct from "@/components/layout/showproduct";
import ProductCardSkeleton from "@/components/layout/productCardSkeleton";
import { ProdectScema } from "@/schemas/product";
import z from "zod";

type ProductFormData = z.infer<typeof ProdectScema>;

interface Props {
  title: string;
  product: ProductFormData[];
  goToShow?: () => void;
  isLoading?: boolean;
}

export default function ProductsHome({
  title,
  product,
  goToShow,
  isLoading,
}: Props) {
  return (
    <section className="py-10 sm:py-14">
      <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h2>
        <button
          onClick={goToShow}
          className="shrink-0 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          View all
        </button>
      </div>

      {isLoading ? (
        <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : product.length === 0 ? (
        <div className="flex h-40 items-center justify-center rounded-lg border border-border">
          <p className="text-muted-foreground">No products found.</p>
        </div>
      ) : (
        <div className="animate-in grid w-full grid-cols-2 gap-4 fade-in slide-in-from-bottom-2 duration-700 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {product.map((item) => (
            <ShowProduct
              key={item.id}
              color={item.images[0].color}
              id={item.id!}
              img={item.image}
              name={item.name}
              rating={item.rating}
              price={item.price}
              discountPercentage={item.discountPercentage}
            />
          ))}
        </div>
      )}
    </section>
  );
}
