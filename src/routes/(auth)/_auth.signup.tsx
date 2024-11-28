import React from "react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { z } from "zod";
import { sendEmailVerification } from "firebase/auth";

import { useAuth } from "../../utilities/auth/AuthProvider";
import { useNotification } from "../../utilities/notification/Notification";
import Textfield from "../../components/textField/Textfield";
import { GoogleIcon } from "../../assets/images";
import useFormField from "../../utilities/formField/useFormField";

export const Route = createFileRoute("/(auth)/_auth/signup")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  component: SignupComponent,
});

function SignupComponent() {
  const notification = useNotification();
  const auth = useAuth();
  const router = useRouter();
  const email = useFormField({
    initialValue: "",
    schema: z.string().email({ message: "Enter a valid email" }),
  });
  const password = useFormField({
    initialValue: "",
    schema: z
      .string()
      .min(6)
      .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
      .regex(/\d/, { message: "Must contain at least one number" }),
  });



  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const isEmailValid = email.validate();
    const isPasswordValid = password.validate();
    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    const res = await auth.createUser({
      email: email.value,
      password: password.value,
    });

    if (res) {
      await auth.logOut();
      notification?.addNotification({
        message: "User created successfully",
        type: "success",
        timeout:5_000
      });
    

      await sendEmailVerification(res);

      notification?.addNotification({
        message: "Check your email for a verification email",
        type: "success",
        showCloseButton: true
      });

      setTimeout(async () => {
        await auth.logOut();
        email.setValue("");
        password.setValue("");

        
      }, 1000);
    }
  }

  return (
    <div className="border-1 border-gray-400 w-full h-full p-7">
      <h1 className="text-xl font-bold mt-2 pb-5">Sign up</h1>

      <form
        className="flex flex-col justify-center gap-4 mb-5"
        onSubmit={onSubmit}
        autoComplete="off"
      >
        <Textfield
          label="Email"
          type="text"
          value={email.value}
          onChange={email.handleChange}
          error={email.error}
        />

        <Textfield
          name="password"
          label="Password"
          type="password"
          value={password.value}
          onChange={password.handleChange}
          error={password.error}
        />

        <button
          type="submit"
          // disabled={isSubmitDisabled}
          className={`text-white text-xl rounded-md px-4 py-3 ${"bg-blue-500 hover:bg-blue-400"}`}
        >
          Submit
        </button>
      </form>

      <div className="flex justify-center flex-row h-1 mb-[10px] items-center">
        <span className="bg-gray-400 h-[1px] grow-[1]"></span>
        <span className="p-1">OR</span>
        <span className="bg-gray-400 h-[1px] grow-[1]"></span>
      </div>

      <div>
        <button></button>
      </div>

      <a
        className="rounded-md outline-blue-300 flex w-full h-12 bg-blue-600 gap-2 items-center p-[22px] text-white hover:bg-blue-500 hover:text-white cursor-pointer hover:scale-105"
        onClick={async () => {
          await auth.signInWithGoogle();
          await router.invalidate();
        }}
      >
        <GoogleIcon className="h-[25px] w-[25px]" />

        <span className="text-center flex-grow">Sign in with Google</span>
      </a>

      <p>
        Already have an account ? <Link to="/login">Login</Link>{" "}
      </p>
    </div>
  );
}
