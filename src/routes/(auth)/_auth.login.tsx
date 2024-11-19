import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { string, z } from "zod";
import { useAuth } from "../../utilities/auth/AuthProvider";
import Textfield from "../../components/textField/Textfield";
import { useNotification } from "../../utilities/notification/Notification";

export const Route = createFileRoute("/(auth)/_auth/login")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  component: LoginComponent,
});

const emailValidationSchema = z
  .string()
  .email({ message: "Enter a valid email address" });

function LoginComponent() {
  const notification = useNotification()
  const auth = useAuth();
  const navigate = Route.useNavigate();

  const [formData, setFormData] = React.useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
  const [errors, setErrors] = React.useState<{
    email?: string;
    password?: string;
  }>({});
  const isSubmitDisabled =
    formData.email.trim().length === 0 || formData.password.length === 0;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const { password, email } = formData;
    e.preventDefault();
    const emailValidation = emailValidationSchema.safeParse(formData.email);
    if (!emailValidation.success) {
      setErrors((prev) => ({ ...prev, email: emailValidation.error.issues[0].message }));
      return;
    }

    const res = await auth.login({ email, password });
    if (res.success) {
      navigate({ to: "/home" });
    } else {
      
      const errorMessage = res.error ? res.error : 'Failed to login'
      console.log(errorMessage)
      notification?.addNotification({message: errorMessage, type: 'error'})
    }
  };

  function HandleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    (errors.email || errors.password) && setErrors({});

    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <div className="border border-gray-400 w-full h-full p-7">
      <h1 className="text-xl font-bold mt-2 pb-5">Login</h1>

      <form className="flex flex-col gap-4 mb-5" onSubmit={handleSubmit}>
        <Textfield
          label="Email"
          type="text"
          value={formData.email}
          onChange={HandleInputChange}
          name="email"
          error={errors}
        />

        <Textfield
          label="Password"
          type="password"
          value={formData.password}
          onChange={HandleInputChange}
          name="password"
        />

        <button
          type="submit"
          disabled={isSubmitDisabled}
          className={`text-white text-xl rounded-md px-4 py-3 ${
            isSubmitDisabled
              ? "bg-blue-400 bg-opacity-40 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-400"
          }`}
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
