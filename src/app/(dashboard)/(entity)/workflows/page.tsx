import {
  WorkflowList,
  WorkflowsHeader,
} from "@/features/workflows/components/workflow";
import { prefetchWorkflows } from "@/features/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-util";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default async function Page() {
  await requireAuth();
  prefetchWorkflows();

  return (
    <section className="container mx-auto max-w-6xl my-6">
      <HydrateClient>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <Suspense fallback={<div>Loading...</div>}>
            <WorkflowsHeader />
            <WorkflowList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </section>
  );
}
