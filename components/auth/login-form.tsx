"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { loginAction } from "@/lib/actions/auth";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";
import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    setError(null);
    startTransition(async () => {
      const result = await loginAction({
        ...values,
        callbackUrl,
      });
      if (result?.error) {
        setError(result.error);
      }
    });
  });

  return (
    <AuthCard
      title="Welcome back"
      description="Sign in to manage your properties."
      footer={
        <span>
          New here?{" "}
          <Link
            className="font-medium text-zinc-900 hover:underline dark:text-zinc-50"
            href="/register"
          >
            Create an account
          </Link>
        </span>
      }
    >
      <form onSubmit={onSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            {...form.register("email")}
          />
          {form.formState.errors.email?.message ? (
            <p className="text-xs text-red-500">
              {form.formState.errors.email.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            {...form.register("password")}
          />
          {form.formState.errors.password?.message ? (
            <p className="text-xs text-red-500">
              {form.formState.errors.password.message}
            </p>
          ) : null}
        </div>

        {error ? (
          <p role="alert" className="text-sm text-red-500">
            {error}
          </p>
        ) : null}

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </AuthCard>
  );
}
