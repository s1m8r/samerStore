import { useGetreviews } from "@/API/reviews";
import Rating from "./rading";
interface Props {
  id: number;
  name: string;
  storeName: string;
}
export default function ReadView({ id, name, storeName }: Props) {
  const search = id + name + storeName;
  const { data: myReviews } = useGetreviews(search);
  if (!myReviews?.data.length) {
    return (
      <div className="flex h-32 items-center justify-center rounded-lg border border-border">
        <p className="text-muted-foreground">No reviews yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {myReviews.data.map((item) => (
        <div
          className="flex gap-4 rounded-2xl border border-border bg-card p-4"
          key={item.id}
        >
          <div className="flex flex-col justify-between gap-2">
            <div>
              <Rating rating={item.rating} type="main" />
              <div className="mt-1 font-bold">{item.name}</div>
              <div className="text-sm text-muted-foreground">
                {item.textreview}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Posted on:{" "}
              {new Date(item.createdAt!).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
