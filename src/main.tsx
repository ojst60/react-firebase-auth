import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { AuthProvider, useAuth } from "./utilities/auth/AuthProvider";
import { NotificationProvider } from "./utilities/notification/Notification";

import "./index.css";

// Set up a Router instance
const router = createRouter({
  routeTree,
  context: {
    auth: undefined,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NotificationProvider>
    <AuthProvider>
        <InnerApp />
    </AuthProvider>
    </NotificationProvider>
 
  </React.StrictMode>
);
