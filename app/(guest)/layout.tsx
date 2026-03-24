import GuestGuard from "@/hocs/GuestGuard";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  return <GuestGuard>
    {children}</GuestGuard>;
}
