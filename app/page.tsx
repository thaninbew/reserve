import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="relative z-10 min-h-screen px-6 py-20 text-foreground">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 text-center">
        <div className="space-y-3">
          <h1 className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-2">
            Reserve
          </h1>
          <p className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Estate management, simplified.
          </p>
          <p className="max-w-2xl text-base text-muted-foreground font-mono text-sm leading-relaxed">
            Organize properties, documents, and family roles in one secure
            workspace.
          </p>
        </div>

        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Get started in minutes</CardTitle>
            <CardDescription>
              Create an account or sign in to access your family dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg">
              <Link href="/register">Create account</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/login">Sign in</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
