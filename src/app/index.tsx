import { GoogleOAuthProvider } from "@react-oauth/google";
import { RouterProvider, createRouter } from "@tanstack/react-router";

import "react-toastify/dist/ReactToastify.css";
import { useAuthStore, useGlobalLoadingStore } from "../stores";
import { GOOGLE_OAUTH_CLIENT_ID } from "../config/env";
import { routeTree } from "@/routeTree.gen";
import { useCallback, useEffect } from "react";
import handleAxiosError from "@/helpers/handle-axios-error";
import { useUserStore } from "@/stores/user.store";
import UserService from "@/services/user/user.service";
import { toast, ToastContainer } from "react-toastify";

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    authContext: { isAuthenticated: false, isManager: false },
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const AppRouter = () => {
  const { isAuthenticated } = useAuthStore();
  const { user } = useUserStore();
  return (
    <RouterProvider
      router={router}
      context={{
        authContext: { isAuthenticated, isManager: user?.isManager || false },
      }}
    />
  );
};

export default function App() {
  const { isAuthenticated, setIsAuthenticated } = useAuthStore();
  const { setUser } = useUserStore();
  const { setGlobalLoading } = useGlobalLoadingStore();

  const getProfile = useCallback(async () => {
    try {
      setGlobalLoading(true);
      const { data } = await UserService.getUserProfile();
      setUser(data);
    } catch (error: unknown) {
      setIsAuthenticated(false);
      handleAxiosError(error, (message: string) => {
        toast.error(message);
      });
    } finally {
      setGlobalLoading(false);
    }
  }, [setUser, setGlobalLoading, setIsAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      getProfile();
    }
  }, [isAuthenticated, getProfile]);

  // useEffect(() => {
  //   if (!isAuthenticated) return;

  //   if (!socket.connected) {
  //     socket.io.opts.extraHeaders = {
  //       Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") as string)}`,
  //       fingerprint: `${JSON.parse(localStorage.getItem("fingerprint") as string)}`,
  //     };
  //     socket.connect();
  //   }

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [isAuthenticated]);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_OAUTH_CLIENT_ID}>
      <AppRouter />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </GoogleOAuthProvider>
  );
}
