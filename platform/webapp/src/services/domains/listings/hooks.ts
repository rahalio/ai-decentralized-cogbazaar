import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listingsService } from "./listings.service";

export function useList(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({
    queryKey: ["listings", "list", params],
    queryFn: () => listingsService.list(params),
  });
}

export function useCreate() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: unknown) => listingsService.create(body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["listings"] }),
  });
}

export { listingsService };
