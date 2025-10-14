import { LoginForm } from "@/components/auth/login-form";
import { requireNoAuth } from "@/lib/auth-util";

export default async function LoginPage() {
  await requireNoAuth();
  return <LoginForm />;
}
