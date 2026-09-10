import { keepPreviousData, useQuery } from "@tanstack/react-query";
import api from "./axios";
import z from "zod";
import { colorsSchema } from "@/schemas/colors";

const queryKey = ["colors"];
type productFormData = z.infer<typeof colorsSchema>;
type productAll = {
  data: productFormData[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

export const useGetColors = () => {
  return useQuery<productAll>({
    queryKey,

    queryFn: async () => {
      const res = await api.get(`api/collection/colors?limit=12`);

      return res.data;
    },
    placeholderData: keepPreviousData,
  });
};
