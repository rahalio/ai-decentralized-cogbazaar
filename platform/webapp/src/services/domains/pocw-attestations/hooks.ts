import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { pocwAttestationsService } from "./pocw-attestations.service";

export function useList(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({
    queryKey: ["pocw-attestations", "list", params],
    queryFn: () => pocwAttestationsService.list(params),
  });
}

export function useCreate() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: unknown) => pocwAttestationsService.create(body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["pocw-attestations"] }),
  });
}

export { pocwAttestationsService };
