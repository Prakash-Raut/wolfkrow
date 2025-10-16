"use client";

import { useHasActiveSubscription } from "@/hooks/use-subscription";
import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { StarIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";

export function ClientGreeting() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data: workflows } = useSuspenseQuery(
    trpc.getWorkflows.queryOptions(),
  );

  const { hasActiveSubscription, subscription, isLoading } =
    useHasActiveSubscription();

  const createWorkflow = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());
      },
    }),
  );

  const testAi = useMutation(
    trpc.testAi.mutationOptions({
      onSuccess: () => {
        toast.success("AI Job Queued");
      },
      onError: () => {
        toast.error("AI Job Failed");
      },
    }),
  );

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Workflows</h2>

      <p className="font-semibold">{JSON.stringify(workflows, null, 2)}</p>
      <Button
        variant="ghost"
        onClick={() => testAi.mutate()}
        disabled={testAi.isPending}
      >
        Test AI
      </Button>
      <Button
        onClick={() => createWorkflow.mutate()}
        disabled={createWorkflow.isPending}
      >
        Create Workflow
      </Button>
      {!hasActiveSubscription && !isLoading && (
        <Button onClick={() => authClient.checkout({ slug: "Wolfkrow-Pro" })}>
          <StarIcon className="size-4" />
          Upgrade to Pro
        </Button>
      )}
      <Button variant="outline" onClick={() => authClient.signOut()}>
        Logout
      </Button>
    </section>
  );
}
