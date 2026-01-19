"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache"; 
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma"; 
import { createReserveSchema } from "@/lib/validations/reserve";

export async function createReserve(values: z.infer<typeof createReserveSchema>) {
  const session = await auth();
  
  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  const parsed = createReserveSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Invalid input" };
  }

  const { name } = parsed.data;

  try {
    // Create reserve and link user as OWNER in one transaction equivalent
    const reserve = await prisma.reserve.create({
      data: {
        name,
        users: {
          create: {
            userId: session.user.id,
            role: "OWNER",
          },
        },
      },
    });
    
    revalidatePath("/dashboard");
    return { success: true, reserve };
  } catch (error) {
    console.error("Failed to create reserve:", error);
    return { error: "Failed to create reserve. Please try again." };
  }
}
