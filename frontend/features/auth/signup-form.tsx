"use client";

import { Bi, BiInline } from "@frontend/components/ui/bilingual";
import { overlay } from "@backend/i18n/catalog";
import { Button } from "@frontend/components/ui/button";
import { Input } from "@frontend/components/ui/input";
import { useSignup } from "@frontend/hooks/use-auth";
import { useState } from "react";

export function SignupForm() {
  const signup = useSignup();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        signup.mutate({ email, password, full_name: fullName });
      }}
    >
      <Input label={<BiInline en="Full name" ar="الاسم الكامل" />} value={fullName} onChange={(e) => setFullName(e.target.value)} />
      <Input label={<BiInline en="Email" ar="البريد" />} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input
        label={<BiInline en="Password" ar="كلمة المرور" />}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {signup.error ? (
        <p className="text-sm text-terracotta">
          <Bi pair={overlay(signup.error.message)} compact />
        </p>
      ) : null}
      <Button type="submit" className="w-full" disabled={signup.isPending}>
        {signup.isPending ? (
          <BiInline en="Creating account…" ar="جارٍ إنشاء الحساب…" />
        ) : (
          <BiInline en="Create account" ar="إنشاء حساب" />
        )}
      </Button>
    </form>
  );
}
