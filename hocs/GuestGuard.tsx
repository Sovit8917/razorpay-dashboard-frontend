import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function GuestGuard({ children }: { children: ReactNode }) {
  const session = await auth();
  if (session) redirect("/dashboard");
  return <>{children}</>;
}