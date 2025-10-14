import prisma from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "../init";

export const appRouter = createTRPCRouter({
  getUser: protectedProcedure.query(({ ctx }) => {
    return prisma.user.findUnique({
      where: {
        id: ctx.auth.user.id,
      },
    });
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
