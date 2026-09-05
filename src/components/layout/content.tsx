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
import { Check, Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useCartStore } from "@/stores/cartStore";
import WriteReview from "./writeReview";
import ReadView from "./readView";
import ProductsHome from "@/pages/home/productsHome";
import { useGetProducts } from "@/API/product";
import Faqs from "@/pages/storesPages/faq";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetColors } from "@/API/colors";

interface images {
  color: string;
  path: string;
}

interface Props {
  type: "products" | "stores";
  id: number;
  name: string;
  image: string;
  price: number;
  storeName: string;
  images: images[];
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
  const { data } = useGetProducts(4, typeOfProduct);
  const cartItem = cartItems.find((item) => item.productId === id);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeThumb, setActiveThumb] = useState(0);
  const priceAfter = price - (price * discountPercentage) / 100;
  const colors = images.filter((item) => item.color !== "xcolor");
  const [selectedColor, setSelectedColor] = useState(
    colors.map((item) => item.color)[0],
  );
  const colorName = Nameofcolor?.data.find(
    (i) => i.color === selectedColor,
  )?.path;
  return (
    <div className="px-4 md:px-12">
      <div className="">
        <TitleContent title={name} />
        <div className="flex gap-4 mb-4 flex-col md:flex-row">
          <div className="flex flex-col-reverse gap-1.5 md:flex-row">
            <div className="w-full max-w-full overflow-hidden md:w-24">
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
                  className={`flex! h-24! w-24! shrink-0! items-center! justify-center! cursor-pointer
      ${activeThumb === 0 ? "border-2 border-amber-700" : ""}`}
                >
                  <img
                    src={image}
                    alt=""
                    className="h-full w-full rounded-[8px] object-cover"
                  />
                </SwiperSlide>

                {images.map((item, i) => (
                  <SwiperSlide
                    key={item.path}
                    onClick={() => setActiveThumb(i + 1)}
                    className={`flex! h-24! w-24! shrink-0! items-center! justify-center! cursor-pointer
        ${activeThumb === i + 1 ? "border-2 border-amber-700" : ""}`}
                  >
                    <img
                      src={item.path}
                      alt=""
                      className="h-full w-full rounded-[8px] object-cover"
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
                className="m-0! flex aspect-square w-full max-w-sm rounded-[8px]"
                onSlideChange={(swiper) => setActiveThumb(swiper.activeIndex)}
              >
                <SwiperSlide className="m-0 flex! items-center!">
                  <div className="swiper-zoom-container m-0">
                    <img src={image} className="h-full w-full object-contain" />
                  </div>
                </SwiperSlide>

                {images.map((item) => (
                  <SwiperSlide
                    key={item.path}
                    className="m-0 flex! items-center!"
                  >
                    <div className="swiper-zoom-container">
                      <img
                        src={item.path}
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
                    <span className="rounded-full bg-red-50 px-2 text-base text-red-500">
                      {discountPercentage}%
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
              <div className="flex gap-2">
                {colors.map((item) => (
                  <span
                    key={item.color}
                    onClick={() => setSelectedColor(item.color)}
                    className={`w-8 h-8 rounded-full cursor-pointer flex justify-center items-center`}
                    style={{ backgroundColor: item.color }}
                  >
                    {selectedColor === item.color && (
                      <Check className="text-white" size={20} />
                    )}
                  </span>
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
                    className="rounded-full px-5"
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
                    Buy
                  </Button>
                )}
              </>
            </div>
          </div>
        </div>

        <Tabs defaultValue="Reviews">
          <TabsList variant="line">
            <TabsTrigger value="Reviews">Rating & Reviews</TabsTrigger>
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
          </TabsList>
          <TabsContent value="Reviews">
            <div className="flex justify-between">
              <TitleContent title="All Reviews" isRegister={true} />
              <WriteReview id={id} name={name} storeName={storeName} />
            </div>
            <ReadView id={id} name={name} storeName={storeName} />
          </TabsContent>
          <TabsContent value="faqs" className="w-full">
            <Faqs />
          </TabsContent>
        </Tabs>

        <ProductsHome title="You might also like" product={data?.data ?? []} />
      </div>
    </div>
  );
}
