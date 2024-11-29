import React from "react";
import { createRoot } from "react-dom/client";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { AuthProvider } from "./utilities/auth/AuthProvider";
import { NotificationProvider } from "./utilities/notification/Notification";
import InnerApp from "./InnerApp";

import "./index.css";

// Set up a Router instance
const router = createRouter({
  routeTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <NotificationProvider>
        <InnerApp router={router} />
      </NotificationProvider>
    </AuthProvider>
  </React.StrictMode>
);
