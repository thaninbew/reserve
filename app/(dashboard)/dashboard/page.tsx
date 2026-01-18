import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-16 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <div className="mx-auto w-full max-w-4xl space-y-4">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Signed in as {session?.user?.email}
        </p>
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <p className="text-sm">
            You are authenticated. This area will evolve into the property
            dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
