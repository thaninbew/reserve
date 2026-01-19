import { auth } from "@/lib/auth";
import { logout } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="relative z-10 min-h-screen px-6 py-16 text-foreground font-sans">
      <div className="mx-auto w-full max-w-4xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">
               Welcome back, {session?.user?.name || session?.user?.email}
            </p>
          </div>
          <form action={logout}>
             <Button variant="outline" size="sm">Sign out</Button>
          </form>
        </div>

        {/* Action Bar */}
        <div className="flex items-center gap-4 border-b border-border/40 pb-6">
             <CreateReserveDialog />
             <JoinReserveDialog />
        </div>

        {/* Reserves List */}
        <div className="space-y-4">
          <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Your Reserves</h2>
          {userReserves.length === 0 ? (
            <Card className="flex flex-col items-center justify-center py-12 text-center border-dashed">
                <CardContent>
                    <p className="text-muted-foreground">You don't belong to any reserves yet. Create one to get started!</p>
                </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {userReserves.map((ur) => (
                <Card 
                  key={ur.reserveId} 
                  className="cursor-pointer group hover:border-[#c5a059]/50"
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{ur.reserve.name}</CardTitle>
                        <span className="inline-flex items-center rounded-full bg-[#c5a059]/10 px-2 py-0.5 text-[10px] font-medium text-[#c5a059] uppercase tracking-wide">
                        {ur.role}
                        </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                     <p className="text-xs font-mono text-muted-foreground">
                       EST. {ur.reserve.createdAt.toLocaleDateString()}
                     </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
