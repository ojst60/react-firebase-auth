import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "../../utilities/auth/AuthProvider";
import { useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)/_protected")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.navigate({ to: "/login" });
    }
  }, [isAuthenticated, router]);
  return isAuthenticated ? <Outlet /> : null;
}
