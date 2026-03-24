import AuthGuard from "@/hocs/AuthGuard";
import { ReactNode } from "react";
import Navbar from "./dashboard/_components/Navbar";
import { Toaster } from "sonner";

export default async function Layout({ children }: { children: ReactNode }) {
  return <AuthGuard>
    <Navbar/>
    <Toaster position="top-right" richColors />
    {children}
    </AuthGuard>;
}
