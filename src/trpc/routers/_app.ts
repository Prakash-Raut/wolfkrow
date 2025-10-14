import { inngest } from "@/inngest/client";
import prisma from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "../init";

export const appRouter = createTRPCRouter({
  testAi: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "ai/chat.completion",
    });

    return {
      success: true,
      message: "Job Queued",
    };
  }),
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "test/hello.world",
      data: {
        email: "test@test.com",
      },
    });

    return await prisma.workflow.create({
      data: {
        name: "Test Workflow",
      },
    });
  }),
  getWorkflows: protectedProcedure.query(async ({ ctx }) => {
    return await prisma.workflow.findMany();
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
