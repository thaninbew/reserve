"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { resetSchema } from "@/lib/validations/auth";
import { reset } from "@/lib/actions/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthCard } from "@/components/auth/auth-card";
import { Label } from "@/components/ui/label";

export function ResetForm() {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof resetSchema>>({
        resolver: zodResolver(resetSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = (values: z.infer<typeof resetSchema>) => {
        setError(null);
        setSuccess(null);

        startTransition(() => {
            reset(values).then((data) => {
                setError(data?.error || null);
                setSuccess(data?.success || null);
            });
        });
    };

    return (
        <AuthCard
            title="Forgot your password?"
            description="Enter your email to reset your password"
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
                        <Label htmlFor="email">Email</Label>
                        <Input
                            {...form.register("email")}
                            id="email"
                            placeholder="john.doe@example.com"
                            type="email"
                            disabled={isPending}
                        />
                         {form.formState.errors.email?.message && (
                           <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>
                         )}
                    </div>
                </div>
                {error && <p className="text-sm font-medium text-destructive">{error}</p>}
                {success && <p className="text-sm font-medium text-green-500">{success}</p>}
                <Button disabled={isPending} type="submit" className="w-full">
                    Send reset email
                </Button>
            </form>
        </AuthCard>
    );
}
