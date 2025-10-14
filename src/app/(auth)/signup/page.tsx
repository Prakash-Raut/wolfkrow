import { SignupForm } from "@/components/auth/signup-form";
import { requireNoAuth } from "@/lib/auth-util";

export default async function SignupPage() {
  await requireNoAuth();
  return <SignupForm />;
}
