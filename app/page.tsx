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
    <div className="min-h-screen bg-zinc-50 px-6 py-20 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 text-center">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Reserve
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Estate management, simplified.
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground">
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
