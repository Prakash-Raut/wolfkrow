import { requireAuth } from "@/lib/auth-util";

export default async function Page() {
  await requireAuth();

  return (
    <main className="container mx-auto max-w-5xl space-y-6">
      <h1> Executions </h1>
    </main>
  );
}
