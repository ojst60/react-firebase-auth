import * as React from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useAuth } from "../utilities/auth/AuthProvider";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  beforeLoad: async () => {
    throw redirect({
      to: "/login",
    });
  },
});

function RouteComponent() {
  const auth = useAuth();

  React.useEffect(() => {});
  return <>Redirect to login as homepage</>;
}
