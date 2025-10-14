"use client";

import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { Button } from "../ui/button";

export function ClientGreeting() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data: workflows } = useSuspenseQuery(
    trpc.getWorkflows.queryOptions(),
  );
  const createWorkflow = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());
      },
    }),
  );

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Workflows</h2>
      <p className="font-semibold">{JSON.stringify(workflows, null, 2)}</p>
      <Button
        onClick={() => createWorkflow.mutate()}
        disabled={createWorkflow.isPending}
      >
        Create Workflow
      </Button>
      <Button onClick={() => authClient.signOut()}>Logout</Button>
    </section>
  );
}
