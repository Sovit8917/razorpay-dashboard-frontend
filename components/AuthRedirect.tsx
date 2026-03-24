"use client";
import { redirect, usePathname } from "next/navigation";
import { buildLoginRedirect } from "@/lib/auth-redirect";

const AuthRedirect = () => {
  const pathname = usePathname();
  const login = "/login";
  const homePage = "/";

  return redirect(
    pathname === login
      ? login
      : pathname === homePage
        ? login
        : buildLoginRedirect(pathname),
  );
};

export default AuthRedirect;