import React, {
  useState,
  useEffect,
  useMemo,
  createContext,
  useCallback,
} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { FirebaseError } from "firebase/app";
import { z, ZodError } from "zod";

type UserDetails = {
  email: string;
  password: string;
};

export type IAuthContext = {
  createUser: (userDetails: UserDetails) => Promise<Auth>;
  login: (userDetails: UserDetails) => Promise<Auth>;
  user: User | null;
  logOut: () => Promise<void>;
  passwordResetEmailHandler: (email: string) => Promise<void>;
  signInWithGoogle: () => Promise<Auth>;
  loading: boolean;
  isAuthenticated: boolean;
};

export type Auth = {
  success: boolean;
  error?: string;
  user?: User;
};

const UserSchema = z.object({
  email: z.string().trim().email({ message: "Enter a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be greater than 6 characters" }),
});

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/userinfo.profile");

  // Memoized createUser function to prevent re-creation on each render
  const createUser = useCallback(
    async ({ email, password }: UserDetails): Promise<Auth> => {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        setUser(res.user);
        return {
          success: true,
          user: res.user,
        };
      } catch (error) {
        let errorMessage: string = "Failed to create new user";
        if (error instanceof FirebaseError) {
          if (error.code === "auth/email-already-in-use")
            errorMessage = "Email already in use";
        }

        return {
          success: false,
          error: errorMessage,
        };
      }
    },
    []
  );

  // Memoized login function
  const login = useCallback(
    async ({ email, password }: UserDetails): Promise<Auth> => {
      try {
        const validatedUser = UserSchema.parse({ email, password });
        const res = await signInWithEmailAndPassword(
          auth,
          validatedUser.email,
          validatedUser.password
        );

        if (!res.user.emailVerified) {
          await signOut(auth);

          return {
            success: false,
            error:
              "Email not verified. Please verify your email before logging in.",
          };
        }

        setUser(res.user);
        return { success: true, user: res.user };
      } catch (error) {
        let errorMessage = "";
        if (error instanceof FirebaseError) {
          switch (error.code) {
            case "auth/invalid-credential":
              errorMessage = "Invalid credentials";
              break;
            case "auth/invalid-password":
              errorMessage = "Invalid password";
              break;
            case "auth/invalid-email":
              errorMessage = "Invalid email";
              break;
            default:
              errorMessage = "Failed to sign in";
              break;
          }
        } else if (error instanceof ZodError) {
          errorMessage = error.errors[0].message;
        }
        return {
          success: false,
          error: errorMessage,
        };
      }
    },
    []
  );

  async function passwordResetEmailHandler(email: string): Promise<void> {
    const url =
      import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEVELOPMENT_URL
        : import.meta.env.VITE_PRODUCTION_URL;
    try {
      await sendPasswordResetEmail(auth, email, {
        handleCodeInApp: true,
        url: `${url}/password_reset`,
      });
    } catch (err) {
      console.log(err);
    }
  }

  // Memoized logOut function
  const logOut = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Handles google sign in
  const signInWithGoogle = useCallback(async (): Promise<Auth> => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      return { success: true, user: result.user };
    } catch (err) {
      let message: string = "Error when trying to sign in";
      if (err instanceof FirebaseError) {
        message = err.message;
      }

      return {
        success: false,
        error: message,
      };
    }
  }, []);

  // Memoize authValue to avoid unnecessary re-renders
  const authValue = useMemo(
    () => ({
      createUser,
      login,
      user,
      logOut,
      loading,
      isAuthenticated: user !== null,
      signInWithGoogle,
      passwordResetEmailHandler,
    }),
    [createUser, login, logOut, user, loading, signInWithGoogle]
  );

  return (
    <AuthContext.Provider value={authValue}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
