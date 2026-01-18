import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-16 dark:bg-black">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-12">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
            Reserve
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
            Estate Manager
          </h2>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Securely manage your family properties in one place.
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
