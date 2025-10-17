import { requireAuth } from "@/lib/auth-util";

export default async function Page({
  params,
}: {
  params: Promise<{ credentialId: string }>;
}) {
  const { credentialId } = await params;
  await requireAuth();
  return (
    <main className="container mx-auto max-w-5xl space-y-6">
      <h1> Credential {credentialId} </h1>
    </main>
  );
}
