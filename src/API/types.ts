import { keepPreviousData, useQuery } from "@tanstack/react-query";
import api from "./axios";

const queryKey = ["types"];
type TypesAll = {
  name: string;
  img: string;
  id: number;
  value: string;
};

export const useGetTypes = () => {
  return useQuery<TypesAll[]>({
    queryKey,
    queryFn: async () => {
      const res = await api.get(`api/collection/types`);
      return res.data.data;
    },
    placeholderData: keepPreviousData,
  });
};

export const useGetType = (id: string) => {
  return useQuery({
    queryKey: [...queryKey, id],
    queryFn: async () => {
      const res = await api.get<TypesAll>(`/api/collection/types/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};
