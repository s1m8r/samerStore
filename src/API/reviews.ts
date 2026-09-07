import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import api from "./axios";
import z from "zod";
import { reviewScema } from "@/schemas/reviews";

const queryKey = ["views"];
type productFormData = z.infer<typeof reviewScema>;
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

export const useGetreviews = (search = "") => {
  return useQuery<productAll>({
    queryKey: [...queryKey, search],

    queryFn: async () => {
      const res = await api.get(
        `api/collection/reviews?limit=6&search=${search}`,
      );

      return res.data;
    },
    placeholderData: keepPreviousData,
  });
};

export const usePostView = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: productFormData) => {
      const res = await api.post("/api/collection/reviews", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
