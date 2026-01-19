import { auth } from "@/lib/auth";
import { logout } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { CreateReserveDialog } from "@/components/dashboard/create-reserve-dialog";
import { JoinReserveDialog } from "@/components/dashboard/join-reserve-dialog";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await auth();

  // Fetch all reserves this user is part of
  const userReserves = await prisma.userReserve.findMany({
    where: {
      userId: session?.user?.id,
    },
    include: {
      reserve: true,
    },
    orderBy: {
        createdAt: 'desc'
    }
  });

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-16 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <div className="mx-auto w-full max-w-4xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
               Welcome back, {session?.user?.name || session?.user?.email}
            </p>
          </div>
          <form action={logout}>
             <Button variant="outline" size="sm">Sign out</Button>
          </form>
        </div>

        {/* Action Bar */}
        <div className="flex items-center gap-4 border-b border-zinc-200 pb-6 dark:border-zinc-800">
             <CreateReserveDialog />
             <JoinReserveDialog />
        </div>

        {/* Reserves List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Reserves</h2>
          {userReserves.length === 0 ? (
            <div className="rounded-xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                <p className="text-zinc-500">You don't belong to any reserves yet. Create one to get started!</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {userReserves.map((ur) => (
                <div 
                  key={ur.reserveId} 
                  className="flex flex-col rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <div className="mb-4">
                    <h3 className="font-semibold text-lg">{ur.reserve.name}</h3>
                    <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                      {ur.role}
                    </span>
                  </div>
                  <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800">
                     <p className="text-xs text-zinc-400">
                       Created {ur.reserve.createdAt.toLocaleDateString()}
                     </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
