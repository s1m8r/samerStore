import { useState } from "react";
import { useGetProducts } from "@/API/product";
import StoreUi from "@/components/layout/stores";
import Paginations from "@/components/layout/pagination";
const TopSell = () => {
  const [page, setPage] = useState(1);
  const { data: products, isLoading } = useGetProducts(
    8,
    "discountPercentage",
    page,
  );
  const [, setColor] = useState("");
  return (
    <>
      <StoreUi
        title={"TOP SELLING"}
        products={
          products?.data.filter((item) => item.discountPercentage > 0) ?? []
        }
        setColor={setColor}
        isLoading={isLoading}
      />
      <Paginations
        currentPage={products?.pagination.currentPage ?? 0}
        totalPages={products?.pagination.totalPages ?? 0}
        hasNextPage={products?.pagination.hasNextPage || false}
        hasPreviousPage={products?.pagination.hasPreviousPage || false}
        page={page}
        setPage={setPage}
      />
    </>
  );
};

export default TopSell;
