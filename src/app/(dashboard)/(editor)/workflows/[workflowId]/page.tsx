import { requireAuth } from "@/lib/auth-util";

export default async function Page({
  params,
}: {
  params: Promise<{ workflowId: string }>;
}) {
  const { workflowId } = await params;
  await requireAuth();
  return (
    <main className="container mx-auto max-w-5xl space-y-6">
      <h1> Execution {workflowId} </h1>
    </main>
  );
}
