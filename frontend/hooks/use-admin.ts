"use client";

import { api } from "@frontend/api/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { SubmitReviewInput } from "@backend/types";

export function useAdminDashboard() {
  return useQuery({ queryKey: ["admin", "dashboard"], queryFn: api.adminDashboard });
}

export function useAdminApplications(params?: { statusKey?: string; typeId?: string; query?: string }) {
  return useQuery({
    queryKey: ["admin", "applications", params],
    queryFn: () => api.adminApplications(params),
  });
}

export function useAdminApplication(id?: string) {
  return useQuery({
    queryKey: ["admin", "application", id],
    queryFn: () => api.adminApplication(id!),
    enabled: Boolean(id),
  });
}

export function useSubmitReview(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: SubmitReviewInput) => api.submitReview(id, input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin"] });
      await queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
}

export function usePerformance() {
  return useQuery({ queryKey: ["admin", "performance"], queryFn: api.performance });
}

export function useFlags() {
  return useQuery({ queryKey: ["admin", "flags"], queryFn: api.flags });
}
