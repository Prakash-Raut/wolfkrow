import { ClientGreeting } from "@/components/common/client-greeting";
import { requireAuth } from "@/lib/auth-util";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default async function Home() {
  await requireAuth();
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.getWorkflows.queryOptions());

  return (
    <main className="container mx-auto max-w-5xl space-y-6">
      <h1 className="text-5xl font-bold">Home Page</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <Suspense fallback={<div>Loading...</div>}>
            <ClientGreeting />
          </Suspense>
        </ErrorBoundary>
      </HydrationBoundary>
    </main>
  );
}
