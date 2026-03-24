import { auth } from "@/auth";
import AuthRedirect from "@/components/AuthRedirect";
import { ReactNode } from "react";

export default async function AuthGuard({ children }: { children: ReactNode }) {
  const session = await auth();
  return <>{session ? children : <AuthRedirect />}</>;
}