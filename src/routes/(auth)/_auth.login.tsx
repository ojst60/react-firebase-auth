import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { useAuth } from "../../utilities/auth/AuthProvider";
import Textfield from "../../components/textField/Textfield";
import { useNotification } from "../../utilities/notification/Notification";
import useFormField from "../../utilities/formField/useFormField";

export const Route = createFileRoute("/(auth)/_auth/login")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  component: LoginComponent,
});

function LoginComponent() {
  const notification = useNotification();
  const auth = useAuth();
  const navigate = Route.useNavigate();

  const email = useFormField({
    initialValue: "",
    schema: z.string().email({ message: "Enter a valid email" }),
  });
  const password = useFormField({
    initialValue: "",
    schema: z.string().trim().min(1, { message: "Enter a valid password" }),
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const isEmailValid = email.validate();
    const isPasswordValid = password.validate();
    if (isEmailValid || isPasswordValid) {
      return;
    }

    const res = await auth.login({
      email: email.value,
      password: password.value,
    });
    if (res.success) {
      navigate({ to: "/home" });
    } else {
      const errorMessage = res.error ? res.error : "Failed to login";

      notification?.addNotification({ message: errorMessage, type: "error" });
    }
  }

  return (
    <div className="border border-gray-400 w-full h-full p-7">
      <h1 className="text-xl font-bold mt-2 pb-5">Login</h1>

      <form className="flex flex-col gap-4 mb-5" onSubmit={handleSubmit}>
        <Textfield
          label="Email"
          type="text"
          value={email.value}
          onChange={email.handleChange}
          name="email"
          error={email.error}
        />

        <Textfield
          label="Password"
          type="password"
          value={password.value}
          onChange={password.handleChange}
          name="password"
          error={password.error}
        />

        <button
          type="submit"
          className={`text-white text-xl rounded-md px-4 py-3 ${"bg-blue-500 hover:bg-blue-400"}`}
        >
          Submit
        </button>
      </form>

      <Link to="/password_rest">Forgotten your pasoword ?</Link>

      <p>
        Don't have an account?{" "}
        <Link className="text-blue-600" to="/signup">
          Sign up
        </Link>
      </p>
    </div>
  );
}
