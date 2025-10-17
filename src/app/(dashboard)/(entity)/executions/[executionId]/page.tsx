import { requireAuth } from "@/lib/auth-util";

export default async function Page({
  params,
}: {
  params: Promise<{ executionId: string }>;
}) {
  const { executionId } = await params;
  await requireAuth();
  return (
    <main className="container mx-auto max-w-5xl space-y-6">
      <h1> Execution {executionId} </h1>
    </main>
  );
}
