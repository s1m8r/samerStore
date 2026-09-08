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
  const { data: peoducts, isLoading: isLoadingNew } = useGetProducts(4, "id");
  const { data: peoductsTop, isLoading: isLoadingTop } = useGetProducts(
    4,
    "rating",
  );
  return (
    <>
      <section className="relative overflow-hidden bg-background">
        <div className="relative hidden w-full md:block">
          <div className="relative aspect-1440/663 w-full bg-[#f6f5f5]">
            <img
              src="/bgrt.png"
              alt="Two models in denim jackets and hoodies"
              className="absolute inset-0 h-full w-full object-contain"
            />
            <div className="absolute inset-y-0 left-0 flex w-[55%] animate-in flex-col justify-center px-10 fade-in slide-in-from-bottom-4 duration-700 lg:px-16">
              <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-foreground lg:text-5xl xl:text-6xl">
                Wear the street.
                <br />
                Not the trend.
              </h1>
              <p className="mt-4 max-w-sm text-base leading-7 text-muted-foreground">
                Denim, hoodies and accessories from independent stores — new
                drops every week.
              </p>
              <Button
                className="mt-8 w-fit rounded-full bg-primary px-8 py-6 text-base font-semibold text-primary-foreground hover:bg-primary/90"
                onClick={() => navigation({ to: "/stores/newarrivals" })}
              >
                Shop new arrivals
              </Button>
            </div>
          </div>
        </div>

        <div className="relative w-full md:hidden">
          <div className="relative aspect-square w-full bg-[#f6f5f5]">
            <img
              src="/bgMobile.png"
              alt="Two models in denim jackets and hoodies"
              className="absolute inset-0 h-full w-full object-contain"
            />
          </div>
          <div className="animate-in px-5 py-6 text-center fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-3xl font-bold leading-[1.05] tracking-tight">
              Wear the street.
              <br />
              Not the trend.
            </h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Denim, hoodies and accessories — new drops every week.
            </p>
            <Button
              className="mt-5 w-full rounded-full bg-primary py-6 text-base font-semibold text-primary-foreground hover:bg-primary/90"
              onClick={() => navigation({ to: "/stores/newarrivals" })}
            >
              Shop new arrivals
            </Button>
          </div>
        </div>
      </section>

      <div className="animate-in bg-[#0a0a0a] py-5 fade-in duration-700">
        <Marquee pauseOnHover className="[--gap:0.75rem]">
          {data?.data.map((store) => (
            <button
              key={store.id}
              onClick={() => navigation({ to: `/stores/${store.id}` })}
              className="flex h-16 w-28 shrink-0 items-center justify-center rounded-xl bg-white/5 p-2 transition-colors hover:bg-white/10"
            >
              <img
                src={store.image}
                alt={store.name}
                className="max-h-full max-w-full object-contain"
              />
            </button>
          ))}
        </Marquee>
      </div>

      <div className="px-5 md:px-12">
        <ProductsHome
          title="New arrivals"
          product={peoducts?.data ?? []}
          goToShow={() => navigation({ to: "/stores/newarrivals" })}
          isLoading={isLoadingNew}
        />
        <ProductsHome
          title="Top selling"
          product={peoductsTop?.data ?? []}
          goToShow={() => navigation({ to: "/stores/TopSell" })}
          isLoading={isLoadingTop}
        />
        <TypesHome />
      </div>
    </>
  );
};

export default Home;
