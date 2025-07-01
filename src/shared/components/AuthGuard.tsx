"use client";

import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { parseCookies } from "nookies";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.accessToken;

    if (!token) {
      router.replace("/auth/login");
    }
  }, [router]);

  if (!user) {
    const token = parseCookies().accessToken;
    if (!token) return null;
    return null;
  }

  return <>{children}</>;
}
