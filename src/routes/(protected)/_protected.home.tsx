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
    <div>
      <p>Welcome to your email user {auth.user?.email} .</p>
      <p>display name: {auth.user?.displayName}</p>
      <button onClick={logOutHandler}>Log out</button>
    </div>
  );
}
