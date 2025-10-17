import { TRPCError } from "@trpc/server";

export function handleError(error: unknown, msg: string) {
  console.error(error);
  throw new TRPCError({
    code: "BAD_REQUEST",
    message: msg,
  });
}
