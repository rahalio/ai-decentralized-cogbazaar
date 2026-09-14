import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { royaltySharesService } from "./royalty-shares.service";

export function useList(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({
    queryKey: ["royalty-shares", "list", params],
    queryFn: () => royaltySharesService.list(params),
  });
}

export function useCreate() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: unknown) => royaltySharesService.create(body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["royalty-shares"] }),
  });
}

export { royaltySharesService };
