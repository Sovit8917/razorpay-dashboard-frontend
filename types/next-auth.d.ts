import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    uuid: string;
    accessToken: string;
    refreshToken: string;
  }

  interface Session {
    accessToken: string;
    refreshToken: string;
    user: {
      uuid: string;
      name: string;
      email: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    uuid: string;
    accessToken: string;
    refreshToken: string;
  }
}