import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { policyRulesService } from "./policy-rules.service";

export function useList(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({
    queryKey: ["policy-rules", "list", params],
    queryFn: () => policyRulesService.list(params),
  });
}

export function useCreate() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: unknown) => policyRulesService.create(body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["policy-rules"] }),
  });
}

export { policyRulesService };
