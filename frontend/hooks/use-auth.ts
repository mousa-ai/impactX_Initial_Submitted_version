"use client";

import { api } from "@frontend/api/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: api.session,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: api.login,
    onSuccess: async (session) => {
      await queryClient.invalidateQueries({ queryKey: ["session"] });
      router.push(session.user.role === "customer" ? "/app" : "/admin");
    },
  });
}

export function useSignup() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: api.signup,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["session"] });
      router.push("/app");
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: api.logout,
    onSuccess: async () => {
      await queryClient.clear();
      router.push("/login");
    },
  });
}
