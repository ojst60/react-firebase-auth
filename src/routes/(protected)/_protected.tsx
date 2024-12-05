import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "../../utilities/auth/AuthProvider";
import { useRouter } from "@tanstack/react-router";
import emailIcon from "../../assets/email.png";
import { useNotification } from "../../utilities/notification/Notification";

export const Route = createFileRoute("/(protected)/_protected")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isAuthenticated, user, logOut, sendEmailAddressVerification } =
    useAuth();
  const router = useRouter();
  const notification = useNotification();

  async function handleResendEmailVerification() {
    const res = await sendEmailAddressVerification();

    if (res.success) {
      return notification.addNotification({
        type: "success",
        message: `Email verification sent to ${user?.email}`,
      });
    }
    return notification.addNotification({
      type: "error",
      message: `Failed to send email verification`,
    });
  }

  useEffect(() => {
    if (!isAuthenticated) {
      router.navigate({ to: "/login" });
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  if (!user?.emailVerified) {
    return (
      <div className="pt-10 px-5 flex flex-col justify-center items-center gap-6 max-w-md mx-auto">
        <div className="h-24 w-24 bg-gray-200 flex items-center justify-center rounded-full">
          <img src={emailIcon} alt="Email Icon" className="h-12 w-12" />
        </div>

        <p className="font-bold text-2xl text-center text-gray-800">
          Verify Your Email Address
        </p>

        <p className="text-center text-gray-600">
          A verification email has been sent to your registered email{" "}
          <strong>{user?.email}</strong>. Please check your inbox to complete
          the verification process.
        </p>

        <p className="text-center text-gray-600">
          If you didn’t receive the email, click the button below to resend it.
        </p>

        <button
          type="button"
          className="text-white px-6 py-3 bg-blue-500 hover:bg-blue-400 rounded-full shadow-md w-full max-w-xs transition-all"
          onClick={handleResendEmailVerification}
        >
          Resend Verification Email
        </button>

        <button
          type="button"
          onClick={async () => await logOut()}
          className="text-red-600 font-medium px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-full shadow-md w-full max-w-xs transition-all"
        >
          Log Out
        </button>
      </div>
    );
  }

  return <Outlet />;
}
