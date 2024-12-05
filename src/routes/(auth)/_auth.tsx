import { createFileRoute, Outlet, useRouter } from "@tanstack/react-router";
import { z } from "zod";
import { useAuth } from "../../utilities/auth/AuthProvider";
import { useEffect } from "react";

const fallback = "/home" as const;

export const Route = createFileRoute("/(auth)/_auth")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { isAuthenticated} = useAuth();
  const router = useRouter();
  const { redirect } = Route.useSearch();

  useEffect(() => {
    if (isAuthenticated) {
      router.navigate({ to: redirect || fallback });
    }
  }, [isAuthenticated, router, redirect]);

  return (
    <div className="min-h-screen w-full bg-gray-200 flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white shadow-md">
        <Outlet />
      </div>
    </div>
  );
}
