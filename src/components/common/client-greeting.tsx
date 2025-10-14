"use client";

import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";

export function ClientGreeting() {
  const trpc = useTRPC();

  const { data: users } = useSuspenseQuery(trpc.getUser.queryOptions());

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Greeting</h2>
      <pre className="whitespace-pre-wrap">
        {JSON.stringify(users, null, 2)}
      </pre>
      <Button onClick={() => authClient.signOut()}>Logout</Button>
    </section>
  );
}
