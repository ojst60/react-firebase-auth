import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { z } from "zod";
const fallback = "/home" as const;

export const Route = createFileRoute("/(auth)/_auth")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  beforeLoad: async ({ context, search }) => {
    setTimeout(() => {});
    if (context.auth?.isAuthenticated) {
      throw redirect({ to: search.redirect || fallback });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-full w-full bg-gray-200 flex justify-center items-center">
      <div className=" w-96 bg-white rounded-md">
        <Outlet />
      </div>
    </div>
  );
}
