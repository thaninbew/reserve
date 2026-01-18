"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { registerAction } from "@/lib/actions/auth";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";
import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    setError(null);
    startTransition(async () => {
      const result = await registerAction(values);
      if (result?.error) {
        setError(result.error);
      }
    });
  });

  return (
    <AuthCard
      title="Create your account"
      description="Start organizing your family properties today."
      footer={
        <span>
          Already have an account?{" "}
          <Link
            className="font-medium text-zinc-900 hover:underline dark:text-zinc-50"
            href="/login"
          >
            Sign in
          </Link>
        </span>
      }
    >
      <form onSubmit={onSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            autoComplete="name"
            {...form.register("name")}
          />
          {form.formState.errors.name?.message ? (
            <p className="text-xs text-red-500">
              {form.formState.errors.name.message}
            </p>
          ) : null}
        </div>

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
            autoComplete="new-password"
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
          {isPending ? "Creating account..." : "Create account"}
        </Button>
      </form>
    </AuthCard>
  );
}
