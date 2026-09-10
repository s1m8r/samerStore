import TitleContent from "./title";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Zoom,
  Thumbs,
  Scrollbar,
} from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/scrollbar";
import Rating from "./rading";
import { Check, Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { useCartStore } from "@/stores/cartStore";
import WriteReview from "./writeReview";
import ReadView from "./readView";
import ProductsHome from "@/pages/home/productsHome";
import { useGetProducts } from "@/API/product";
import Faqs from "@/pages/storesPages/faq";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetColors } from "@/API/colors";

interface Props {
  type: "products" | "stores";
  id: number;
  name: string;
  image: string;
  price: number;
  storeName: string;
  images: string[];
  colors: string[];
  description?: string;
  typeOfProduct?: string;
  storeId?: number;
  rating: number;
  discountPercentage: number;
}
export default function Content({
  id,
  name,
  image,
  price,
  storeName,
  description,
  typeOfProduct,
  images,
  colors,
  rating,
  discountPercentage,
}: Props) {
  const addToCart = useCartStore((state) => state.addToCart);
  const {
    items: cartItems,
    decreaseQuantity,
    increaseQuantity,
  } = useCartStore();
  const { data: Nameofcolor } = useGetColors();
  const { data } = useGetProducts(4, "", 1, typeOfProduct);
  const cartItem = cartItems.find((item) => item.productId === id);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeThumb, setActiveThumb] = useState(0);
  const priceAfter = price - (price * discountPercentage) / 100;
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const colorName = Nameofcolor?.data.find(
    (i) => i.color === selectedColor,
  )?.path;
  return (
    <div className="px-4 md:px-12">
      <div className="">
        <TitleContent title={name} />
        <div className="animate-in flex gap-4 mb-4 flex-col fade-in slide-in-from-bottom-2 duration-700 md:flex-row">
          <div className="flex flex-col-reverse gap-2 md:flex-row">
            <div className="w-full max-w-full overflow-hidden md:w-20">
              <Swiper
                modules={[Thumbs, Scrollbar]}
                onSwiper={setThumbsSwiper}
                scrollbar={{
                  draggable: true,
                }}
                slidesPerView="auto"
                spaceBetween={10}
                watchSlidesProgress
                direction="horizontal"
                breakpoints={{
                  768: {
                    direction: "vertical",
                    slidesPerView: 4,
                  },
                }}
                className=""
              >
                <SwiperSlide
                  onClick={() => setActiveThumb(0)}
                  className={`flex! h-20! w-20! shrink-0! cursor-pointer! items-center! justify-center! rounded-xl! border! ${
                    activeThumb === 0 ? "border-primary!" : "border-border!"
                  }`}
                >
                  <img
                    src={image}
                    alt=""
                    className="h-full w-full rounded-[10px] object-cover"
                  />
                </SwiperSlide>

                {images.map((item, i) => (
                  <SwiperSlide
                    key={item}
                    onClick={() => setActiveThumb(i + 1)}
                    className={`flex! h-20! w-20! shrink-0! cursor-pointer! items-center! justify-center! rounded-xl! border! ${
                      activeThumb === i + 1
                        ? "border-primary!"
                        : "border-border!"
                    }`}
                  >
                    <img
                      src={item}
                      alt=""
                      className="h-full w-full rounded-[10px] object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="flex w-full justify-center md:w-auto">
              <Swiper
                modules={[Thumbs, Navigation, Pagination, Zoom]}
                thumbs={{ swiper: thumbsSwiper }}
                navigation
                pagination={{ clickable: true }}
                zoom
                className="m-0! flex aspect-square w-full max-w-sm overflow-hidden rounded-2xl! bg-muted"
                onSlideChange={(swiper) => setActiveThumb(swiper.activeIndex)}
              >
                <SwiperSlide className="m-0 flex! items-center!">
                  <div className="swiper-zoom-container m-0">
                    <img src={image} className="h-full w-full object-contain" />
                  </div>
                </SwiperSlide>

                {images.map((item) => (
                  <SwiperSlide key={item} className="m-0 flex! items-center!">
                    <div className="swiper-zoom-container">
                      <img
                        src={item}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-1 border-b border-border pb-4 md:space-y-3">
              <h1 className="text-2xl font-bold">{name}</h1>
              <Rating rating={rating} type="product" />
              <div className="flex items-center gap-2 text-xl">
                <span className="font-bold">${priceAfter.toFixed(2)}</span>
                {discountPercentage > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-base text-muted-foreground line-through">
                      ${price.toFixed(2)}
                    </span>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-sm font-semibold text-primary">
                      -{discountPercentage}%
                    </span>
                  </div>
                )}
              </div>
              <p className="max-w-96 text-base leading-6 text-muted-foreground line-clamp-2">
                {description}
              </p>
            </div>
            <div className="space-y-3">
              <span className="text-sm text-muted-foreground">
                Select Color
              </span>
              <div className="flex gap-3">
                {colors.map((item) => (
                  <button
                    key={item}
                    onClick={() => setSelectedColor(item)}
                    className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full ring-1 ring-offset-2 ring-offset-background transition-all ${
                      selectedColor === item
                        ? "ring-2 ring-primary"
                        : "ring-border"
                    }`}
                    style={{ backgroundColor: item }}
                  >
                    {selectedColor === item && (
                      <Check className="text-white drop-shadow-sm" size={16} />
                    )}
                  </button>
                ))}
              </div>
              <>
                {cartItem ? (
                  <div className="flex h-9 w-fit items-center gap-1 rounded-full border border-border bg-muted p-1">
                    <button
                      onClick={() => decreaseQuantity(cartItem.productId)}
                      className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full hover:bg-background"
                    >
                      <Minus size={14} />
                    </button>

                    <span className="min-w-7 text-center">
                      {cartItem.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(cartItem.productId)}
                      className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full hover:bg-background"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    className="justify-center rounded-full px-5"
                    onClick={() =>
                      addToCart({
                        productId: id,
                        name: name,
                        image: image,
                        price: priceAfter,
                        quantity: 1,
                        color: colorName!,
                        discount: price,
                      })
                    }
                  >
                    <span className="flex items-center justify-center gap-1.5">
                      <ShoppingCart size={16} />
                      Add
                    </span>
                  </Button>
                )}
              </>
            </div>
          </div>
        </div>

        <Tabs defaultValue="Reviews" className="mt-4">
          <TabsList
            variant="line"
            className="mb-6 h-auto gap-6 border-b border-border pb-0"
          >
            <TabsTrigger
              value="Reviews"
              className="rounded-none px-0 pb-3 text-base font-semibold data-active:bg-transparent"
            >
              Rating & Reviews
            </TabsTrigger>
            <TabsTrigger
              value="faqs"
              className="rounded-none px-0 pb-3 text-base font-semibold data-active:bg-transparent"
            >
              FAQs
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="Reviews"
            className="animate-in fade-in duration-500"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">All reviews</h3>
              <WriteReview id={id} name={name} storeName={storeName} />
            </div>
            <div className="mt-6">
              <ReadView id={id} name={name} storeName={storeName} />
            </div>
          </TabsContent>
          <TabsContent
            value="faqs"
            className="w-full animate-in fade-in duration-500"
          >
            <h3 className="mb-4 text-xl font-bold">
              Frequently asked questions
            </h3>
            <Faqs />
          </TabsContent>
        </Tabs>

        <ProductsHome title="You might also like" product={data?.data ?? []} />
      </div>
    </div>
  );
}
