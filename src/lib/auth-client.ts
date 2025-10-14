import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
});

export const getClientSession = async () => {
  return await authClient.getSession();
};
