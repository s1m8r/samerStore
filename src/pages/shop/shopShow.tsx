import { Route } from "@/routes/(proteced)/stores/$id";
import { useState } from "react";
import { useGetStore } from "@/API/stores";
import { useGetProducts } from "@/API/product";
import StoreUi from "@/components/layout/stores";
import Paginations from "@/components/layout/pagination";
const ShopShow = () => {
  const { id } = Route.useParams();
  const { data } = useGetStore(id);
  const title = data?.name;
  const [page, setPage] = useState(1);

  const { data: products, isLoading } = useGetProducts(8, "", page, title);
  const [color, setColor] = useState("");
  console.log(color);
  return (
    <>
      <StoreUi
        title={title ?? ""}
        products={products?.data ?? []}
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

export default ShopShow;
