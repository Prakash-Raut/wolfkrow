import { handleError } from "@/features/utils";
import prisma from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { generateSlug } from "random-word-slugs";
import { z } from "zod";

export const workflowsRouter = createTRPCRouter({
  create: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      return await prisma.workflow.create({
        data: {
          name: generateSlug(2, { format: "kebab" }),
          userId: ctx.auth.user.id,
        },
      });
    } catch (error) {
      handleError(error, "Failed to create workflow. Please try again.");
    }
  }),
  get: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await prisma.workflow.findMany({
        where: {
          userId: ctx.auth.user.id,
        },
      });
    } catch (error) {
      handleError(error, "Failed to get workflows. Please try again.");
    }
  }),
  getOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await prisma.workflow.findUnique({
        where: {
          id: input.id,
          userId: ctx.auth.user.id,
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await prisma.workflow.update({
        where: {
          id: input.id,
          userId: ctx.auth.user.id,
        },
        data: {
          name: input.name,
        },
      });
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await prisma.workflow.delete({
        where: {
          id: input.id,
          userId: ctx.auth.user.id,
        },
      });
    }),
});
