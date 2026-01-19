"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSearchParams } from "next/navigation";

import { newPasswordSchema } from "@/lib/validations/auth";
import { newPassword } from "@/lib/actions/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthCard } from "@/components/auth/auth-card";
import { Label } from "@/components/ui/label";

export function NewPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof newPasswordSchema>>({
        resolver: zodResolver(newPasswordSchema),
        defaultValues: {
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof newPasswordSchema>) => {
        setError(null);
        setSuccess(null);

        startTransition(() => {
            newPassword(values, token).then((data) => {
                setError(data?.error || null);
                setSuccess(data?.success || null);
            });
        });
    };

    return (
        <AuthCard
            title="Enter a new password"
            description="Please provide a new password for your account"
            footer={
                <div className="w-full text-center">
                    <a className="text-sm underline hover:text-zinc-900" href="/login">
                        Back to login
                    </a>
                </div>
            }
        >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            {...form.register("password")}
                            id="password"
                            placeholder="******"
                            type="password"
                            disabled={isPending}
                        />
                         {form.formState.errors.password?.message && (
                           <p className="text-xs text-red-500">{form.formState.errors.password.message}</p>
                         )}
                    </div>
                </div>
                {error && <p className="text-sm font-medium text-destructive">{error}</p>}
                {success && <p className="text-sm font-medium text-green-500">{success}</p>}
                <Button disabled={isPending} type="submit" className="w-full">
                    Reset password
                </Button>
            </form>
        </AuthCard>
    );
}
