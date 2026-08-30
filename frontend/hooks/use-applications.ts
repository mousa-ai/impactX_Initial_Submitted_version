"use client";

import { api } from "@frontend/api/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UpsertAnswerInput } from "@backend/types";

export function useApplicationTypes() {
  return useQuery({ queryKey: ["application-types"], queryFn: api.applicationTypes });
}

export function useStatuses() {
  return useQuery({ queryKey: ["statuses"], queryFn: api.statuses });
}

export function useQuestions(applicationTypeId?: string, answers?: Record<string, unknown>) {
  return useQuery({
    queryKey: ["questions", applicationTypeId, answers],
    queryFn: () => api.questions(applicationTypeId, answers),
    enabled: Boolean(applicationTypeId),
  });
}

export function useMyApplications() {
  return useQuery({ queryKey: ["applications", "mine"], queryFn: api.myApplications });
}

export function useApplication(id?: string) {
  return useQuery({
    queryKey: ["applications", id],
    queryFn: () => api.getApplication(id!),
    enabled: Boolean(id),
  });
}

export function useCreateApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.createApplication,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
}

export function useSaveAnswers(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (answers: UpsertAnswerInput[]) => api.saveAnswers(id, answers),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["applications", id] });
      await queryClient.invalidateQueries({ queryKey: ["checklist", id] });
    },
  });
}

export function useChecklist(id?: string) {
  return useQuery({
    queryKey: ["checklist", id],
    queryFn: () => api.checklist(id!),
    enabled: Boolean(id),
  });
}

export function useSubmitApplication(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => api.submitApplication(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
}
