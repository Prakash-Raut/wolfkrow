"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export function ClientGreeting() {
  const trpc = useTRPC();

  const { data: users } = useSuspenseQuery(trpc.getUser.queryOptions());

  return <div>{JSON.stringify(users, null, 2)}</div>;
}
