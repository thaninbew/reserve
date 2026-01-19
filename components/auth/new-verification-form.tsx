"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

import { newVerification } from "@/lib/actions/auth";
import { AuthCard } from "@/components/auth/auth-card";

export function NewVerificationForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const verifiedRef = useRef<string | null>(null);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    // Prevent verifying the same token multiple times
    if (verifiedRef.current === token) return;
    if (!token) return;

    verifiedRef.current = token;

    newVerification(token)
      .then((data) => {
        setSuccess(data.success || null);
        setError(data.error || null);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token]);

  if (!token) {
    return (
      <AuthCard
        title="Confirming your verification"
        description="Please wait while we confirm your email."
        footer={
          <div className="flex w-full items-center justify-center">
            <a className="text-sm underline hover:text-zinc-900" href="/login">
              Back to login
            </a>
          </div>
        }
      >
        <div className="flex w-full items-center justify-center">
          <p className="text-red-500">Missing token!</p>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Confirming your verification"
      description="Please wait while we confirm your email."
      footer={
        <div className="flex w-full items-center justify-center">
          <a className="text-sm underline hover:text-zinc-900" href="/login">
            Back to login
          </a>
        </div>
      }
    >
      <div className="flex w-full items-center justify-center">
        {!success && !error && <Loader2 className="h-10 w-10 animate-spin" />}
        {success && <p className="text-green-500">{success}</p>}
        {!success && error && <p className="text-red-500">{error}</p>}
      </div>
    </AuthCard>
  );
}
