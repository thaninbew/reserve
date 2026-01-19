import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-10 min-h-screen bg-transparent px-4 py-16">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-12">
        <div className="text-center">
          <h1 className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-2">
            Reserve
          </h1>
          <h2 className="mt-2 text-3xl font-semibold text-foreground">
            Estate Manager
          </h2>
          <p className="mt-2 text-sm text-muted-foreground font-mono">
            Securely manage your family properties in one place.
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
