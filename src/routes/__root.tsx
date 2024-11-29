import * as React from "react";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

export const Route = createRootRouteWithContext()({
  component: () => (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  ),
});
