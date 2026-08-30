"use client";

import { Bi, BiInline } from "@frontend/components/ui/bilingual";
import { overlay } from "@backend/i18n/catalog";
import { Button } from "@frontend/components/ui/button";
import { Input } from "@frontend/components/ui/input";
import { useLogin } from "@frontend/hooks/use-auth";
import { useState } from "react";

export function LoginForm() {
  const login = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        login.mutate({ email, password });
      }}
    >
      <Input label={<BiInline en="Email" ar="البريد" />} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input
        label={<BiInline en="Password" ar="كلمة المرور" />}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {login.error ? (
        <p className="text-sm text-terracotta">
          <Bi pair={overlay(login.error.message)} compact />
        </p>
      ) : null}
      <Button type="submit" className="w-full" disabled={login.isPending}>
        {login.isPending ? (
          <BiInline en="Signing in…" ar="جارٍ الدخول…" />
        ) : (
          <BiInline en="Continue" ar="متابعة" />
        )}
      </Button>
    </form>
  );
}
