import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { grantPoolsService } from "./grant-pools.service";

export function useList(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({
    queryKey: ["grant-pools", "list", params],
    queryFn: () => grantPoolsService.list(params),
  });
}

export function useCreate() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: unknown) => grantPoolsService.create(body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["grant-pools"] }),
  });
}

export { grantPoolsService };
