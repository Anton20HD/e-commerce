
import { DefaultSession } from "next-auth";

// Declare module to extend the default session types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      //image?: string | null;
    };
  }

  interface User {
    id: string; 
  }
}
