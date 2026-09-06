import { useGetTypes } from "@/API/types";
import { useNavigate } from "@tanstack/react-router";

const TypesHome = () => {
  const { data } = useGetTypes();
  const navigate = useNavigate();
  return (
    <div className="animate-in rounded-3xl bg-[#f0f0f0] p-8 overflow-hidden shadow-sm ring-1 ring-black/5 fade-in slide-in-from-bottom-2 duration-700">
      <h2 className="relative text-3xl font-bold text-center uppercase tracking-wide mb-8">
        BROWSE BY dress STYLE
      </h2>
      <div className="grid grid-cols-12 gap-5">
        {data?.map((item, index) => {
          const small = index === 0 || index === 3;

          return (
            <div
              key={item.id}
              onClick={() => navigate({ to: `/stores/type/${item.id}` })}
              className={`group relative h-60 overflow-hidden rounded-3xl cursor-pointer shadow-md transition-shadow duration-300 hover:shadow-xl ${
                small
                  ? "col-span-12 md:col-span-5"
                  : "col-span-12 md:col-span-7"
              }`}
            >
              <h3 className="absolute top-4 left-4 z-10 text-2xl font-bold">
                {item.name}
              </h3>

              <img
                src={item.img}
                alt={item.name}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TypesHome;
