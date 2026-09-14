import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { jobsService } from "./jobs.service";

export function useList(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({
    queryKey: ["jobs", "list", params],
    queryFn: () => jobsService.list(params),
  });
}

export function useCreate() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: unknown) => jobsService.create(body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["jobs"] }),
  });
}

export { jobsService };
