import {
  WorkflowContainer,
  WorkflowList,
  WorkflowsHeader,
} from "@/features/workflows/components/workflow";
import { loadWorkflowsParams } from "@/features/workflows/params";
import { prefetchWorkflows } from "@/features/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-util";
import { HydrateClient } from "@/trpc/server";
import type { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page({ searchParams }: PageProps) {
  await requireAuth();
  const params = await loadWorkflowsParams(searchParams);
  prefetchWorkflows(params);

  return (
    <section className="container mx-auto max-w-6xl my-6">
      <HydrateClient>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <Suspense fallback={<div>Loading...</div>}>
            <WorkflowContainer>
              <WorkflowList />
            </WorkflowContainer>
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </section>
  );
}
