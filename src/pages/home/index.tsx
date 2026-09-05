import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Marquee } from "@/components/ui/marquee";
import { useGetStores } from "@/API/stores";
import ProductsHome from "./productsHome";
import { useGetProducts } from "@/API/product";
import TypesHome from "./types";

const Home = () => {
  const navigation = useNavigate();
  const { data } = useGetStores();
  const { data: peoducts } = useGetProducts(4, "id");
  const { data: peoductsTop } = useGetProducts(4, "rating");
  return (
    <>
      <div className="flex flex-col gap-6 p-4 md:h-fit md:flex-row md:gap-0 md:bg-[url('/bgrt.png')] md:bg-cover md:bg-center md:bg-no-repeat md:p-30 md:rounded-full">
        <div className="w-full max-w-2xl space-y-6 md:flex md:justify-center">
          <div className="flex h-fit flex-col p-2 sm:p-4">
            <p className="text-3xl font-bold leading-tight sm:text-4xl md:text-6xl">
              Welcome to <span className="text-orange-500">Samer Store</span>
            </p>

            <p className="mb-6 max-w-xl text-sm leading-6 sm:text-base sm:leading-7 md:mb-20 md:text-lg">
              Browse thousands of high-quality products from trusted brands at
              competitive prices. Fast, secure, and convenient shopping.
            </p>

            <Button
              className="w-full rounded-full px-8 py-6 text-base font-semibold md:w-fit"
              onClick={() => navigation({ to: "/stores/newarrivals" })}
            >
              Go to Store
            </Button>
          </div>
        </div>

        <div className="w-full md:hidden">
          <img
            src="/bgMobile.png"
            alt="Samer Store"
            className="mx-auto aspect-square w-full max-w-md rounded-2xl object-cover"
          />
        </div>
      </div>
      <div>
        <Marquee pauseOnHover className="bg-black h-24 p-8">
          {data?.data.map((image) => (
            <img
              key={image.id}
              src={image.image}
              className=" object-cover rounded-lg overflow-hidden mx-12"
            />
          ))}
        </Marquee>
        <div className="p-4 md:p-24">
          <ProductsHome
            title="NEW ARRIVALS"
            product={peoducts?.data ?? []}
            goToShow={() => navigation({ to: "/stores/newarrivals" })}
          />
          <ProductsHome
            title="top selling"
            product={peoductsTop?.data ?? []}
            goToShow={() => navigation({ to: "/stores/TopSell" })}
          />
          <TypesHome />
        </div>
      </div>
    </>
  );
};

export default Home;
