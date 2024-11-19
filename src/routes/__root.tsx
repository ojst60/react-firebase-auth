import * as React from "react";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { IAuthContext } from "../utilities/auth/AuthProvider";

interface MyRouterContext {
  auth: IAuthContext | undefined;
}
export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  ),
});
