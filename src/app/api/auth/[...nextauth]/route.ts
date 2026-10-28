import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return [
    { nextauth: ["session"] },
    { nextauth: ["csrf"] },
    { nextauth: ["providers"] },
  ];
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

