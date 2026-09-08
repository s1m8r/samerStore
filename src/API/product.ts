import { keepPreviousData, useQuery } from "@tanstack/react-query";
import api from "./axios";
import { ProductScema } from "@/schemas/product";
import z from "zod";

const queryKey = ["product"];
type productFormData = z.infer<typeof ProductScema>;
export interface paginations {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
export type productAll = {
  data: productFormData[];
  pagination: paginations;
};

export const useGetProducts = (
  limit = 10,
  sortBy = "",
  page = 1,
  search = "",
) => {
  return useQuery<productAll>({
    queryKey: [...queryKey, limit, sortBy, page, search],

    queryFn: async () => {
      const res = await api.get(
        `api/collection/product?limit=${limit}&sortBy=${sortBy}&page=${page}&search=${search}`,
      );

      return res.data;
    },
    placeholderData: keepPreviousData,
  });
};

export const useGetProduct = (id: number) => {
  return useQuery({
    queryKey: [queryKey, id],
    queryFn: async () => {
      const res = await api.get<productFormData>(
        `/api/collection/product/${id}`,
      );
      return res.data;
    },
    enabled: !!id,
  });
};
