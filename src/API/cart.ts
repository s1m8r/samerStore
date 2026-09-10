import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import api from "./axios";
import z from "zod";
import { CartCreateSchema, CartScema } from "@/schemas/cart";

const queryKey = ["cart"];

type productCreateData = z.infer<typeof CartCreateSchema>;
type productResponseData = z.infer<typeof CartScema>;

type productAll = {
  data: productResponseData[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

export const useGetCart = (search = "", enabled = true) => {
  return useQuery<productAll>({
    queryKey: [...queryKey, search],

    queryFn: async () => {
      const res = await api.get(`api/collection/cart?search=${search}`);

      return res.data;
    },
    enabled,
    placeholderData: keepPreviousData,
  });
};

export const useCart = () => {
  return useMutation({
    mutationFn: async (data: productCreateData) => {
      const res = await api.post("/api/collection/cart", data);
      return res.data.data;
    },
  });
};
