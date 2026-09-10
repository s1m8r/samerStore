import { keepPreviousData, useQuery } from "@tanstack/react-query";
import api from "./axios";
import { storeScema } from "@/schemas/stores";
import z from "zod";
type storeFormData = z.infer<typeof storeScema>;
type storeResponseType = {
  data: storeFormData[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

const queryKey = ["stores"];
export const useGetStores = (page = 1, search = "") => {
  return useQuery<storeResponseType>({
    queryKey: [...queryKey, page, search],

    queryFn: async () => {
      const res = await api.get(`/api/stores?&page=${page}&search=${search}`);

      return res.data;
    },
    placeholderData: keepPreviousData,
  });
};

export const useGetStore = (id?: number) => {
  return useQuery({
    queryKey: [...queryKey, id],
    queryFn: async () => {
      const res = await api.get<storeFormData>(`/api/stores/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};
