import AuthGuard from "@/hocs/AuthGuard";
import { ReactNode } from "react";
import Navbar from "./dashboard/_components/Navbar";
import { Toaster } from "sonner";
import { SubscriptionProvider } from "@/context/SubscriptionContext";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <SubscriptionProvider>
        <Navbar />
        <Toaster position="top-right" richColors />
        {children}
      </SubscriptionProvider>
    </AuthGuard>
  );
}