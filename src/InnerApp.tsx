import { useAuth } from "./utilities/auth/AuthProvider";
import { RouterProps, RouterProvider } from "@tanstack/react-router";
interface Props {
  router: RouterProps["router"];
}

export default function InnerApp({ router }: Props) {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}
