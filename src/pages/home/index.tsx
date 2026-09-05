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
      <div
        className="z-1  relative
  h-screen md:h-fit
  bg-[url('/bgMobile.png')] bg-cover bg-center bg-no-repeat
  flex items-center p-2 md:p-30
  md:bg-[url('/bgrt.png')]
  md:rounded-full
  after:absolute after:inset-0 after:bg-black/20
  md:after:hidden"
      >
        <div className="max-w-2xl space-y-6 w-full flex justify-center z-2 ">
          <div className="flex flex-col p-4 h-fit">
            <p className="text-4xl font-bold leading-tight md:text-6xl flex justify-center md:block">
              <span className="text-white md:text-black">Welcome to </span>
              <span className="text-orange-500">Samer Store</span>
            </p>

            <p className="max-w-xl text-base leading-7 md:text-lg mb-20 text-white md:text-black text-center md:text-left">
              Browse thousands of high-quality products from trusted brands at
              competitive prices. Fast, secure, and convenient shopping.
            </p>

            <Button
              className="rounded-full px-8 py-6 text-base font-semibold w-full  md:w-fit"
              onClick={() => navigation({ to: "/stores" })}
            >
              Go to Store
            </Button>
          </div>
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
