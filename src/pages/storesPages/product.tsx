import { useGetProduct } from "@/API/product";
import Content from "@/components/layout/content";
import ProductDetailSkeleton from "@/components/layout/productDetailSkeleton";
import { Route } from "@/routes/(proteced)/stores/product/$id";

const Product = () => {
  const { id } = Route.useParams();
  const { data, isLoading } = useGetProduct(id);
  return (
    <div>
      {isLoading && <ProductDetailSkeleton />}
      {data && (
        <Content
          images={data.images}
          storeId={data.storeId}
          id={data.id!}
          type="products"
          name={data.name}
          image={data.image}
          price={data.price}
          storeName={data.storeName}
          description={data.description}
          typeOfProduct={data.type}
          rating={data.rating}
          discountPercentage={data.discountPercentage}
        />
      )}
    </div>
  );
};

export default Product;
