import { createFileRoute } from "@tanstack/react-router";
import Textfield from "../../components/textField/Textfield";
import { useAuth } from "../../utilities/auth/AuthProvider";
import { z } from "zod";
import useFormField from "../../utilities/formField/useFormField";
import { useNotification } from "../../utilities/notification/Notification";

export const Route = createFileRoute("/(auth)/_auth/password_rest")({
  component: RouteComponent,
});

function RouteComponent() {
  const notification = useNotification();
  const email = useFormField({
    initialValue: "",
    schema: z.string().email({ message: "Enter a valid email" }),
  });

  const auth = useAuth();

  async function submitHandler() {
    const isValidEmail = email.validate();
    if (!isValidEmail) {
      return;
    }
    await auth.passwordResetEmailHandler(email.value);

    notification.addNotification({
      message: "Email reminder sent to your email",
      type: "success",
    });
  }
  return (
    <div className="border border-gray-400 w-full h-full flex p-7 gap-5 flex-col">
      <h1 className="text-xl font-bold mt-2 pb-5 -mb-4">Forgot Password</h1>

      <Textfield
        label="Email"
        onChange={email.handleChange}
        type="text"
        value={email.value}
        error={email.error}
      />
      <p className="text-sm">
        We’ll send a verification code to this email if it matches an existing
        account.
      </p>
      <button
        className={`text-white text-xl rounded-md px-4 py-3 ${"bg-blue-500 hover:bg-blue-400"}`}
        onClick={submitHandler}
      >
        Send Link
      </button>
    </div>
  );
}
