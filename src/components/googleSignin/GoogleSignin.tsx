import React from "react";
import { GoogleIcon } from "../../assets/images";
import { useAuth } from "../../utilities/auth/AuthProvider";
import { useNotification } from "../../utilities/notification/Notification";

interface GoogleSignInProps {
  navigateHandler: () => void;
}
export default function GoogleSignin({
  navigateHandler,
}: GoogleSignInProps): JSX.Element {
  const auth = useAuth();
  const notification = useNotification();
  return (
    <React.Fragment>
      <div className="flex justify-center flex-row h-1 mb-[10px] items-center">
        <span className="bg-gray-400 h-[1px] grow-[1]"></span>
        <span className="p-1">OR</span>
        <span className="bg-gray-400 h-[1px] grow-[1]"></span>
      </div>

      <a
        className="rounded-md outline-blue-300 flex w-full h-12 bg-blue-600 gap-2 items-center p-[22px] text-white hover:bg-blue-500 hover:text-white cursor-pointer hover:scale-105"
        onClick={async () => {
          const res = await auth.signInWithGoogle();
          if (res.error) {
            return notification.addNotification({
              type: "error",
              message: res.error,
              timeout: 2000,
            });
          }
        
          navigateHandler();
        }}
      >
        <GoogleIcon className="h-[25px] w-[25px]" />

        <span className="text-center flex-grow">Sign in with Google</span>
      </a>
    </React.Fragment>
  );
}
