import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  beforeLoad: async () => {
    throw redirect({
      to: "/login",
    });
  },
});

function RouteComponent() {
  return <>Redirect to login as homepage</>;
}
