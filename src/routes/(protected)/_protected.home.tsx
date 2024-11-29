import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "../../utilities/auth/AuthProvider";

export const Route = createFileRoute("/(protected)/_protected/home")({
  component: RouteComponent,
});

function RouteComponent() {
  const auth = useAuth();
  const navigate = Route.useNavigate();
  async function logOutHandler() {
    await auth.logOut();
    if (!auth.user) {
      navigate({ to: "/" });
    }
  }

  return (
    <div className="h-full text-center gap-2 flex-col flex justify-center items-center">
      <p>Welcome to your homepage <strong>{auth.user?.email}</strong></p>
      { auth.user?.displayName && <p>display name: <strong>{auth.user.displayName}</strong></p> }
      <button className="border-1 bg-blue-500" onClick={logOutHandler}>Log out</button>
    </div>
  );
}
